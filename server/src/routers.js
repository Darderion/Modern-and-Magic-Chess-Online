const express = require('express');

const ping = require('./controllers/ping');
const { auth, api, shop } = require('./controllers');
const getAccessToken = require('./middlewares/getAccessToken');
const verifyAccess = require('./middlewares/verifyAccess');
const setRefreshToken = require('./middlewares/setRefreshToken');
const lobbyExists = require('./middlewares/lobbyExists');
const addDefaultStyles = require('./middlewares/addDefaultStyles');

const apiRouter = new express.Router();
const mainRouter = new express.Router();
const authRouter = new express.Router();
const shopRouter = new express.Router();

apiRouter.get('/gameStatus/:id', verifyAccess, api.getGameStatus);
apiRouter.get('/lobby/:id', verifyAccess, lobbyExists, api.getLobby);
apiRouter.get('/lobbies', verifyAccess, api.getLobbies);
apiRouter.delete('/lobbies/:id', verifyAccess, api.deleteLobby);
apiRouter.post('/createLobby', verifyAccess, api.createLobby);
apiRouter.post('/makeMove', verifyAccess, api.makeMove);
apiRouter.post('/highlightMoves', verifyAccess, api.highlightMoves);
apiRouter.get('/getStyles', verifyAccess, api.getStyles);
apiRouter.post('/getUserStyles', verifyAccess, api.getUserStyles);
apiRouter.post('/setStyle/:id', verifyAccess, api.setStyle);

shopRouter.get('/getLootboxStyles/:id', verifyAccess, shop.getLootboxStyles);
shopRouter.post('/buyLootbox/:id', verifyAccess, shop.buyLootbox);

authRouter.post('/register', auth.register, addDefaultStyles);
authRouter.post('/login', auth.login, setRefreshToken, getAccessToken);
authRouter.post('/refresh', auth.refresh, setRefreshToken, getAccessToken);
authRouter.get('/logout', auth.logout);

mainRouter.get('/ping', verifyAccess, ping);

apiRouter.get('/history/get/:id', verifyAccess, api.history.get);
apiRouter.get('/history/getForUser/:id', verifyAccess, api.history.getForUser);
apiRouter.get('/history/getForAll', verifyAccess, api.history.getForAll);

exports.mainRouter = mainRouter;
exports.apiRouter = apiRouter;
exports.authRouter = authRouter;
exports.shopRouter = shopRouter;
