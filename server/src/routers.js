const express = require('express');

// const api = require('./controllers/api');
const ping = require('./controllers/ping');

const apiRouter = new express.Router();

/*
apiRouter.get('/lobbies', api.getLobbies);
apiRouter.get('/lobby/:id', lobbyExists, api.getLobby);
apiRouter.post('/lobby', api.addLobby);
apiRouter.delete('/lobbies/:id', api.deleteLobby);
*/

const mainRouter = new express.Router();

exports.apiRouter = apiRouter;

mainRouter.get('/ping', ping);

exports.mainRouter = mainRouter;
