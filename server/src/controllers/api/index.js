const createLobby = require('./createLobby');
const deleteLobby = require('./deleteLobby');
const getGameStatus = require('./getGameStatus');
const getLobbies = require('./getLobbies');
const getLobby = require('./getLobby');
const highlightMoves = require('./highlightMoves');
const makeMove = require('./makeMove');

module.exports = {
  history: require('./history'),
  createLobby,
  deleteLobby,
  getGameStatus,
  getLobbies,
  getLobby,
  highlightMoves,
  makeMove,
};
