const { Chess } = require('chess.js');

const { Game } = require('../../db/models');
const { PgnLoadingChessError } = require('../../validators/errors/ChessError');
const {
  DatabaseConnectionError,
} = require('../../validators/errors/ConnectionError');

// TEST
// curl -X POST -H "Content-Type: application/json" -d '{"lobbyId": "2", "position": "a2"}' http://localhost:5000/api/highlightMoves

module.exports = async (req, res) => {
  const { lobbyId, position } = req.body;

  const game = new Chess();

  try {
    const gameModels = await Game.findAll({
      attributes: ['description'],
      where: { id: lobbyId },
    });

    const pgn = gameModels[0].description;

    if (!game.load_pgn(pgn)) {
      const pgnError = new PgnLoadingChessError();
      return pgnError.sendResponse(res);
    }
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }

  const allMoves = game.moves({ square: position }).map((t) => {
    let output = t.replace('+', '').replace('#', '');
    const eqIndex = output.indexOf('=');

    if (eqIndex !== -1) {
      output = output.substring(0, eqIndex);
    }

    return output;
  });

  const moves = allMoves
    .filter((t) => t[1] !== 'x')
    .map((t) => (t.length === 2 ? t : t.substring(1, t.length)));

  const eatMoves = allMoves
    .filter((t) => t[1] === 'x')
    .map((t) => t.substring(2, t.length));

  // The # symbol at the end means that the move leads to a checkmate
  // 'd7' ~ Pawn can make a move on d7
  // 'd7+' ~ Pawn can make a move on d7 and this move will lead to a checkmate
  // 'Qd7' ~ Queen can make a move on d7
  // 'Qd7+' ~ Queen can make a move on d7 and this move will lead to a checkmate
  // 'exf5' ~ Pawn from 'e' strip can eat piece from d7
  // 'exf5+' ~ Pawn from 'e' strip can eat piece from d7 and this move will lead to a checkmate
  // 'Qxd7' ~ Queen can eat piece from d7
  // 'Qxd7+' ~ Queen can eat piece from d7 and this move will lead to a checkmate
  // 'gxh8=Q' ~ Pawn from 'g' strip can reach the end (by eating piece from h8) and become a Queen
  // 'gxh8=Q+' ~ Pawn from 'g' strip can reach the end (by eating piece from h8) and become a Queen and this move will lead to a checkmate
  // 'e1=Q' ~ Pawn can reach the end (by make a move on e1) and become a Queen
  // 'e1=Q+' ~ Pawn can reach the end (by make a move on e1) and become a Queen and this move will lead to a checkmate

  return res.json({
    moves: moves,
    eatMoves: eatMoves,
    turn: game.turn(),
  });
};
