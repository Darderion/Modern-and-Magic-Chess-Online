const WebSocket = require("ws");
const { env } = require('../../config/index');
const isValidPassword = require('../../util/isValidPassword')
const { sendToWS, workWithWS, addOnError, whereWS, tryAuth } = require('./wsHelper');

module.exports = (server) => {
    const serverInfo = {
        wsServer: new WebSocket.Server({server}),
        lobbyClients: new Set(),
        lobbies: []
    };
    serverInfo.lobbies.maxID = 0;
    serverInfo.wsServer.on('connection', async(ws, req) => {
        let haveUser = false;
        if(req.headers.cookie && (ws.user = tryAuth(req.headers
            .cookie[env.cookieUsername], req.headers.cookie[env.cookiePass]))) {
            sendToWS(ws, 'connection', 200, {message: `Connected`, 
            userID: ws.user.id});
        } else {
            sendToWS(ws, 'connection', 400, {message: 'Logged as guest.'});
        }
        addOnError(ws);
        if(req.url === '/main') {
            ws.where = whereWS.beforeLobbies;
            ws.on('message', (message) => {
                const data = JSON.parse(message);
                workWithWS(ws, serverInfo, data);
            });
        }
    });
}
