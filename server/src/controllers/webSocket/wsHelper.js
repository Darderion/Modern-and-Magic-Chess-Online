const { User } = require('../../db/models');

const whereWS = {beforeLobbies: 0, inLobbies: 1, inLobbie: 2, inGame: 3};
const errorMessanges = {
    guestAuth: 'Authorized as guest',
    notAuth: 'Not authorized user',
    wrongLobbyID: 'Wrond lobbyID'
}
const successMessanges = {
    auth: 'Authorised'
}

class Message {
    constructor(message) {
        this.message = message;
    }
}
const createGame = (ws1, ws2, serverInfo) => {
    //...
}
const removeFromArr = (arr, el) => {
    return arr.filter(el2 => el2 !== el);
}
const tryAuth = (nick, passwordHash) => {
    if(nick && passwordHash) {
        const user = await User.findOne({
            where: { nick: nick } });
        if(user && isValidPassword(passwordHash, user.passwordHash, 
            user.salt)) {
            return user;
        }
    } 
    return undefined;
}
const addOnError = (ws, serverInfo) => {
    ws.on('error', () => ws.close());
    ws.on('close', () => {
        moveBeforeLobbies(ws, serverInfo);
    });
}
const sendToWS = (ws, type, code, data) => {
    if(ws.readyState === 1)
        ws.send(JSON.stringify({type: type, data: data, 
            code: code}));
}
const moveBeforeLobbies = (ws, serverInfo) => {
    ws.where = whereWS.beforeLobbies;
    serverInfo.lobbies = removeFromArr(serverInfo.lobbies, ws);
    serverInfo.lobbyClients.remove(ws);
}
const workWithWS = (ws, serverInfo, data) => {
    switch(data.type) {
        case 'auth':
            moveBeforeLobbies(ws, serverInfo);
            ws.user = tryAuth(data.data.nick, data.data.passwordHash);
            if(ws.user) {
                sendToWS(ws, 'auth', 200, {message: successMessanges.auth,
                    userID: ws.user.id});
            } else {
                sendToWS(ws, 'connection', 400, 
                    Message(errorMessanges.guestAuth));
            }
            break;
        case 'openLobby':
            if(ws.user) {
                ws.lobbyName = data.data.lobbyName || 'Unnamed';
                ws.where = whereWS.inLobbie;
                ws.lobbyID = serverInfo.lobbies.maxID++;
                sendToWS(ws, 'openLobby', 200, 
                {lobbyID: ws.lobbyID, lobbyName: ws.lobbyName});
                serverInfo.lobbyClients.remove(ws);
                serverInfo.lobbies.push(ws);
            } else {
                sendToWS(ws, 'openLobby', 400, Message( 
                    errorMessanges.notAuth));
            }
            break;
        case 'allLobbies':
            ws.moveBeforeLobbies(ws, serverInfo);
            ws.where = whereWS.inLobbies;
            const lobbies = serverInfo.lobbies
                .map((el) => {return {
                lobbyID: el.lobbyID,
                lobbyName: el.lobbyName,
                userName: el.user.nick
            }});
            sendToWS(ws, 'allLobbies', 200, lobbies);
            break;
        case 'connectToLobby':
            if(ws.user) {
                const lobbyID = data.data.lobbyID;
                const lobbie = serverInfo.lobbies
                    .filter((el) => el.lobbyID === lobbyID);
                if(lobbie.lenght === 0) {
                    sendToWS(ws, 'connectToLobby', 400, 
                        Message(errorMessanges.wrongLobbyID));
                } else {
                    
                }
            } else {
                sendToWS(ws, 400, Message(errorMessanges.notAuth));
            }
            break;
    }
}

module.exports = {
    tryAuth, whereWS, addOnError, sendToWS,
    moveBeforeLobbies, workWithWS
}