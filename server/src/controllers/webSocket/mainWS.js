const { User, sequelize } = require('../../db/models');
//const { env } = require('../../config/index');
const WebSocket = require('ws');
const GameMaster = require('./gameMaster');
//const jwt = require('jsonwebtoken');

const serverInfo = {
    wsServer: undefined,
    lobbyClients: new Set(),
    lobbies: [],
    games: new Map() //key = ws.user.id, value = GameMaster;
};

const whereWS = {beforeLobbies: 0, inLobbies: 1, inLobbie: 2, inGame: 3};
const errorMessages = {
    notAuth: 'Not authorized user',
    wrongLobbyID: 'Wrond lobbyID',
    wrongStep: 'Wrong step or not your step'
}
const successMessages = {
    auth: 'Authorised',
    guestAuth: 'Authorized as guest',
    connected: 'Connected'
}
class Message {
    constructor(message) {
        this.message = message;
    }
}

const getStyle = (ws) => {
    sequelize.query(`SELECT chatStyle.* FROM user, chatStyle WHERE user.id = ${ws.user.id} AND chatStyle.id = user.`)
    //возовем функцию из стилей для получения всех стилей из ws.user.id
    const data = {};
    return data;
}
const createGame = (ws1, ws2) => {
    const gameMaster = new GameMaster(ws1, ws2, serverInfo, 
        (gameID, pgn) => {
            ws1.where = whereWS.inGame;
            ws2.where = whereWS.inGame;
            serverInfo.games.set(ws1.user.id, gameMaster);
            serverInfo.games.set(ws2.user.id, gameMaster);
            sendToWS(ws1, 'createGame', 200, {
                gameID, pgn, isFirst: gameMaster.isFirstFirst, styles: getStyle(ws1) });
            sendToWS(ws2, 'createGame', 200, {
                gameID, pgn, isFirst: !gameMaster.isFirstFirst, styles: getStyle(ws2)});
        });
}
const removeFromArr = (arr, el) => {
    return arr.filter(el2 => el2 !== el);
}
const addOnError = (ws) => {
    ws.on('error', () => ws.close());
    ws.on('close', () => {
        moveBeforeLobbies(ws);
    });
}
const sendToWS = (ws, type, code, data) => {
    if(ws.readyState === 1)
        ws.send(JSON.stringify({type: type, data: data, 
            code: code}));
}
const moveToLobbies = (ws, fromOtherGameWS = false) => {
    ws.where = whereWS.inLobbies;
    if(serverInfo.lobbies.includes(ws)) {
        serverInfo.lobbies = removeFromArr(serverInfo.lobbies, ws);
    }
    if(!fromOtherGameWS && serverInfo.games.has(ws)) {
        moveToLobbies(serverInfo.games.get(ws).getOtherWS(ws), true);
    }
    ws.games.delete(ws);
    serverInfo.lobbyClients.add(ws);
}
const moveBeforeLobbies = (ws) => {
    ws.where = whereWS.beforeLobbies;
    serverInfo.lobbies = removeFromArr(serverInfo.lobbies, ws);
    serverInfo.lobbyClients.delete(ws);
    if(ws.user) {
        const gameMaster = serverInfo.games.get(ws.user.id);
        if(gameMaster) {
            moveToLobbies(gameMaster.getOtherWS(ws), true);
            gameMaster.ws1 = gameMaster.ws2 = undefined;
        }
    }
}
const workWithWS = (ws, data) => {
    switch(data.type) {
        case 'openLobby':
            console.log(ws.user);
            if(ws.user && ws.where === whereWS.inLobbies) {
                ws.lobbyName = data.data.lobbyName || 'Unnamed';
                ws.where = whereWS.inLobbie;
                ws.lobbyID = serverInfo.lobbies.maxID++;
                sendToWS(ws, 'openLobby', 200, 
                {lobbyID: ws.lobbyID, lobbyName: ws.lobbyName});
                serverInfo.lobbyClients.delete(ws);
                serverInfo.lobbies.push(ws);
            } else {
                sendToWS(ws, 'openLobby', 400, new Message( 
                    errorMessages.notAuth));
            }
            break;
        case 'allLobbies':
            serverInfo.lobbyClients.add(ws);
            ws.where = whereWS.inLobbies;
            sendToWS(ws, 'allLobbies', 200, 
                serverInfo.lobbies
                    .map((el) => {return {
                    lobbyID: el.lobbyID,
                    lobbyName: el.lobbyName,
                    userName: el.user.nick
                }}));
            break;
        case 'connectToLobby':
            if(ws.user) {
                const lobbyID = data.data.lobbyID;
                const lobbie = serverInfo.lobbies
                    .filter((el) => el.lobbyID === lobbyID);
                if(lobbie.lenght === 0) {
                    sendToWS(ws, 'connectToLobby', 400, 
                        new Message(errorMessages.wrongLobbyID));
                } else {
                    createGame(lobbie[0], ws);
                }
            } else {
                sendToWS(ws, 400, new Message(errorMessages.notAuth));
            }
            break;
        case 'sendMessage':
            if(ws.where === whereWS.inGame && data.data.message) {
                serverInfo.games.get(ws).messages.push([ws.user.id, data.data.message]);
                sendToWS(serverInfo.games.get(ws).getOtherWS(ws), 'message', 200, new Message(data.data.message));
            }
            break;
        case 'myStep':
            if(ws.where === whereWS.inGame && data.data.move) {
                const pgn = serverInfo.games.get(ws).move(ws, data.data.move)
                if(pgn) {
                    const ws2 = serverInfo.games.get(ws).getOtherWS(ws);
                    sendToWS(ws, 'myStep', 200, { pgn });
                    sendToWS(ws2, 'otherStep', 200, { pgn: pgn });
                } else {
                    sendToWS(ws, 'myStep', 400, new Message(errorMessages.wrongStep));
                }
            } else {
                sendToWS(ws, 'myStep', 400, new Message(errorMessages.wrongStep));
            }
            break;
        case 'auth'://for test
            (async () => {
                ws.user = await User.findOne({
                where: {
                id: data.id,
                }
                });
                sendToWS(ws, 'auth', 200, ws.user);
            })();
            break;
    }
    console.log(ws.where)
    console.log('lobbyClientsSize: ', serverInfo.lobbyClients.size);
    console.log('lobbies: ', serverInfo.lobbies);
    console.log('games: ', serverInfo.games);
}

/* const getUser = (req) => {
    if (!req.headers.authorization || !req.cookies || !req.cookies[env.cookieName])
        return undefined;
    const [method, accessToken] = req.headers.authorization.split(' ');
    if (method !== 'Bearer' || !accessToken)
        return undefined;
    const decodedPayload = jwt.verify(accessToken, env.accessTokenSecret);
    return decodedPayload || undefined;
} */

module.exports = (server) => {
    serverInfo.wsServer = new WebSocket.Server({server});
    serverInfo.lobbies.maxID = 0;
    serverInfo.wsServer.on('connection', async(ws, req) => {
        ws.user = undefined;//getUser(req);
        if(ws.user) {
            sendToWS(ws, 'connection', 200, {message: 
                successMessages.connected, userID: ws.user.id});
        } else {
            sendToWS(ws, 'connection', 200, 
                new Message(successMessages.guestAuth));
        }
        addOnError(ws);
        if(req.url === '/main') {
            ws.where = whereWS.beforeLobbies;
            ws.on('message', (message) => {
                const data = JSON.parse(message);
                workWithWS(ws, data);
            });
        }
        
    });
}