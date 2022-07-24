const express = require('express');

// const api = require('./controllers/api');
const ping = require('./controllers/ping');
const { auth } = require('./controllers');
const getAccessToken = require('./middlewares/getAccessToken');
const verifyAccess = require('./middlewares/verifyAccess');
const setRefreshToken = require('./middlewares/setRefreshToken');
const historyController = require('./controllers/history');
const apiRouter = new express.Router();
const mainRouter = new express.Router();
const authRouter = new express.Router();
const historyRouter = new express.Router();

/*
apiRouter.get('/lobbies', verifyAccess, api.getLobbies);
apiRouter.get('/lobby/:id', verifyAccess, lobbyExists, api.getLobby);
apiRouter.post('/lobby', verifyAccess, api.addLobby);
apiRouter.delete('/lobbies/:id', verifyAccess, api.deleteLobby);
*/

authRouter.post('/register', auth.register);
authRouter.post('/login', auth.login, setRefreshToken, getAccessToken);
authRouter.post('/refresh', auth.refresh, setRefreshToken, getAccessToken);
authRouter.get('/logout', auth.logout);
mainRouter.get('/ping', verifyAccess, ping);
historyRouter.get('/get_history/:id', historyController.getGameHistory);
historyRouter.post('/set_history/:id', historyController.setGameHistory);


exports.mainRouter = mainRouter;
exports.apiRouter = apiRouter;
exports.authRouter = authRouter;
