const createLobby = require('./createLobby');
const deleteLobby = require('./deleteLobby');
const getGameStatus = require('./getGameStatus');
const getLobbies = require('./getLobbies');
const getLobby = require('./getLobby');
const highlightMoves = require('./highlightMoves');
const makeMove = require('./makeMove');
const getStyles = require('./getStyles');
const setStyle = require('./setStyle');

module.exports = {
  history: require('./history'),
  createLobby,
  deleteLobby,
  getGameStatus,
  getLobbies,
  getStyles,
  setStyle,
  getLobby,
  highlightMoves,
  makeMove,
};
