const createLobby = require('./createLobby');
const deleteLobby = require('./deleteLobby');
const getGameStatus = require('./getGameStatus');
const getLobbies = require('./getLobbies');
const getLobby = require('./getLobby');
const highlightMoves = require('./highlightMoves');
const makeMove = require('./makeMove');
const getStyles = require('./getStyles');
const getUserStyles = require('./getUserStyles');
const setStyle = require('./setStyle');
const addMoney = require('./addMoney');
const getUserMoney = require('./getUserMoney');

module.exports = {
  history: require('./history'),
  createLobby,
  deleteLobby,
  getGameStatus,
  getLobbies,
  getStyles,
  getUserStyles,
  setStyle,
  getLobby,
  highlightMoves,
  makeMove,
  addMoney,
  getUserMoney,
};
