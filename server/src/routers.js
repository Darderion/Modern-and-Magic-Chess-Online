const express = require('express');

const ping = require('./controllers/ping');
const { auth, api } = require('./controllers');
const getAccessToken = require('./middlewares/getAccessToken');
const verifyAccess = require('./middlewares/verifyAccess');
const setRefreshToken = require('./middlewares/setRefreshToken');
const lobbyExists = require('./middlewares/lobbyExists');
const apiRouter = new express.Router();
const mainRouter = new express.Router();
const authRouter = new express.Router();

apiRouter.get('/gameStatus/:id', verifyAccess, api.getGameStatus);
apiRouter.get('/lobby/:id', verifyAccess, lobbyExists, api.getLobby);
apiRouter.get('/lobbies', verifyAccess, api.getLobbies);
apiRouter.delete('/lobbies/:id', verifyAccess, api.deleteLobby);
apiRouter.post('/createLobby', verifyAccess, api.createLobby);
apiRouter.post('/makeMove', verifyAccess, api.makeMove);
apiRouter.post('/highlightMoves', verifyAccess, api.highlightMoves);

authRouter.post('/register', auth.register);
authRouter.post('/login', auth.login, setRefreshToken, getAccessToken);
authRouter.post('/refresh', auth.refresh, setRefreshToken, getAccessToken);
authRouter.get('/logout', auth.logout);
mainRouter.get('/ping', verifyAccess, ping);

exports.mainRouter = mainRouter;
exports.apiRouter = apiRouter;
exports.authRouter = authRouter;
