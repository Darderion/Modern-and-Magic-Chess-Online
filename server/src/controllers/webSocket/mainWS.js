const { User } = require('../../db/models');
const { env } = require('../../config/index');
const WebSocket = require('ws');
const GameMaster = require('./gameMaster');
const jwt = require('jsonwebtoken');

const serverInfo = {
  wsServer: undefined,
  lobbyClients: new Set(),
  lobbies: new Set(),
  games: new Map(), //key = ws, value = GameMaster;
};

const errorMessages = {
  notAuth: 'Not authorized user',
  wrongLobbyID: 'Wrond lobbyID',
  wrongStep: 'Wrong step or not your step',
  userIsInGame: 'This user is in game',
  userIsntInGame: "This user isn't in game",
  incorrectData: "This user isn't in game or data wasn't sent to server",
  noOpenLobby: 'No open lobby',
  otherUserLeft: 'Other user have left',
};
const successMessages = {
  auth: 'Authorised',
  guestAuth: 'Authorized as guest',
  connected: 'Connected',
  lobbyClosed: 'Lobby was closed',
  gameClosed: 'Game was closed',
};
class Message {
  constructor(message) {
    this.message = message;
  }
}

const getStyle = (/* ws */) => {
  //возовем функцию из стилей для получения всех стилей из ws.user.id
  const data = {};
  return data;
};
const createGame = (ws1, ws2) => {
  closeLobby(ws1);
  closeLobby(ws2);
  const gameMaster = new GameMaster(ws1, ws2, serverInfo, (gameID, pgn) => {
    serverInfo.games.set(ws1, gameMaster);
    serverInfo.games.set(ws2, gameMaster);
    sendToWS(ws1, 'createGame', 200, {
      gameID,
      pgn,
      isFirst: gameMaster.isFirstFirst,
      styles: getStyle(ws1),
    });
    sendToWS(ws2, 'createGame', 200, {
      gameID,
      pgn,
      isFirst: !gameMaster.isFirstFirst,
      styles: getStyle(ws2),
    });
  });
};
const removeFromLobbies = (ws) => {
  serverInfo.lobbies.delete(ws);
  serverInfo.lobbyClients.delete(ws);
};
const closeGame = (ws) => {
  if (serverInfo.games.has(ws)) {
    serverInfo.games.get(ws).save();
    const ws2 = serverInfo.games.get(ws).getOtherWS(ws);
    sendToWS(ws2, 'closeGame', 200, new Message(errorMessages.otherUserLeft));
    serverInfo.games.delete(ws);
    serverInfo.games.delete(ws2);
  }
};
const addOnError = (ws) => {
  ws.on('error', () => ws.close());
  ws.on('close', () => {
    removeFromLobbies(ws);
    closeGame(ws);
  });
};
const sendToWS = (ws, type, code, data) => {
  if (ws.readyState === 1)
    ws.send(JSON.stringify({ type: type, data: data, code: code }));
};
const sendAllLobbiesForWS = (ws) => {
  sendToWS(
    ws,
    'allLobbies',
    200,
    Array.from(serverInfo.lobbies).map((el) => {
      return {
        lobbyID: el.lobbyID,
        lobbyName: el.lobbyName,
        userName: el.user.nick,
      };
    })
  );
};
const sendAllLobbies = () => {
  serverInfo.lobbyClients.forEach((ws) => sendAllLobbiesForWS(ws));
};
const closeLobby = (ws) => {
  serverInfo.lobbies.delete(ws);
  ws.lobbyID = undefined;
  ws.lobbyName = undefined;
};
const workWithWS = (ws, data) => {
  console.log(data);
  switch (data?.type) {
    case 'openLobby':
      console.log(ws.user);
      if (ws.user && !serverInfo.games.has(ws)) {
        ws.lobbyName = data.data.lobbyName || 'Unnamed';
        ws.lobbyID = serverInfo.lobbies.maxID++;
        serverInfo.lobbies.add(ws);
        sendToWS(ws, 'openLobby', 200, {
          lobbyID: ws.lobbyID,
          lobbyName: ws.lobbyName,
        });
        sendAllLobbies();
      } else {
        if (!ws.user) {
          sendToWS(ws, 'openLobby', 400, new Message(errorMessages.notAuth));
        } else {
          sendToWS(
            ws,
            'openLobby',
            400,
            new Message(errorMessages.userIsInGame)
          );
        }
      }
      break;
    case 'closeLobby':
      if (serverInfo.lobbies.has(ws)) {
        closeLobby(ws);
        sendToWS(
          ws,
          'closeLobby',
          200,
          new Message(successMessages.lobbyClosed)
        );
        sendAllLobbies();
      } else {
        sendToWS(ws, 'closeLobby', 400, new Message(errorMessages.noOpenLobby));
      }
      break;
    case 'allLobbies':
      serverInfo.lobbyClients.add(ws);
      sendAllLobbiesForWS(ws);
      break;
    case 'unsubAllLobbies':
      serverInfo.lobbyClients.delete(ws);
      sendToWS(ws, 'unsubAllLobbies', 200);
      break;
    case 'connectToLobby':
      if (ws.user) {
        if (serverInfo.games.has(ws)) {
          sendToWS(ws, 400, new Message(errorMessages.userIsInGame));
        } else {
          let ws2 = undefined;
          serverInfo.lobbies.forEach((el) => {
            if (el.lobbyID === data.data.lobbyID) {
              ws2 = el;
            }
          });
          if (!ws2) {
            sendToWS(
              ws,
              'connectToLobby',
              400,
              new Message(errorMessages.wrongLobbyID)
            );
          } else {
            createGame(ws2, ws);
          }
        }
      } else {
        sendToWS(ws, 400, new Message(errorMessages.notAuth));
      }
      break;
    case 'sendMessage':
      if (serverInfo.games.has(ws) && data.data.message) {
        serverInfo.games.get(ws).messages.push([ws.user.id, data.data.message]);
        sendToWS(
          serverInfo.games.get(ws).getOtherWS(ws),
          'message',
          200,
          new Message(data.data.message)
        );
      } else if (!serverInfo.games.has(ws)) {
        sendToWS(ws, 'sendMessage', 400, new Message(errorMessages.userIsntInGame));
      }
      break;
    case 'myStep':
      if (serverInfo.games.has(ws) && data.data.move) {
        const pgn = serverInfo.games.get(ws).move(ws, data.data.move);
        if (pgn) {
          const ws2 = serverInfo.games.get(ws).getOtherWS(ws);
          sendToWS(ws, 'myStep', 200, { pgn });
          sendToWS(ws2, 'otherStep', 200, { pgn: pgn });
        } else {
          sendToWS(ws, 'myStep', 400, new Message(errorMessages.wrongStep));
        }
      } else {
        sendToWS(ws, 'myStep', 400, new Message(errorMessages.incorrectData));
      }
      break;
    case 'closeGame':
      if (serverInfo.games.has(ws)) {
        closeGame(ws);
        sendToWS(ws, 'closeGame', 200, new Message(successMessages.gameClosed));
      } else {
        sendToWS(
          ws,
          'closeGame',
          400,
          new Message(errorMessages.userIsntInGame)
        );
      }
      break;
    case 'accToken': 
      getUser(data.data).then(res => {
        ws.user = res?.dataValues;
        if (ws.user) {
          sendToWS(ws, 'accToken', 200, {
            message: successMessages.connected,
            userID: ws.user.id,
          });
        } else {
          sendToWS(ws, 'accToken', 200, new Message(successMessages.guestAuth));
        }
      });
      break;
  }
  console.log('lobbies count: ', serverInfo.lobbies.size);
  console.log('lobbyClientsSize: ', serverInfo.lobbyClients.size);
  //console.log('games size: ', serverInfo.games.size);
};

const getUser = async (message) => {
  if (!message)
    return undefined;
  const [method, accessToken] = message.split(' ');
  if (method !== 'Bearer' || !accessToken) return undefined;
  try {
    const decodedPayload = jwt.verify(accessToken, env.accessTokenSecret);
    const tmp = decodedPayload || undefined;
    if(tmp) {
      const user = await User.findOne({
        where: { id: tmp.id } });
      return user;
    }
  } catch(err) {
    console.log('err: ', err);
  }
  return undefined;
};

module.exports = (server) => {
  serverInfo.wsServer = new WebSocket.Server({ server });
  serverInfo.lobbies.maxID = 0;
  serverInfo.wsServer.on('connection', async (ws, req) => {
    ws.user = undefined;
    sendToWS(ws, 'connection', 200, new Message(successMessages.guestAuth));
    addOnError(ws);
    if (req.url === '/main') {
      ws.on('message', (message) => {
        const data = JSON.parse(message);
        workWithWS(ws, data);
      });
    }
  });
};
