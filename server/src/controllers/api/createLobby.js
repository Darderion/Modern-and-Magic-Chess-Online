const { Chess } = require('chess.js');

const { Game } = require('../../db/models');
const {
  DatabaseConnectionError,
} = require('../../validators/errors/ConnectionError');

// TEST
// curl -X POST -H "Content-Type: application/json" -d '{"secondUser": 2, "firstUserColor": "w"}' http://localhost:5000/api/createLobby

module.exports = async (req, res) => {
  const firstUserId = req.user.id;
  const { secondUserId, firstUserColor } = req.body;

  const whitePlayer = firstUserColor === 'w' ? firstUserId : secondUserId;
  const blackPlayer = whitePlayer === firstUserId ? secondUserId : firstUserId;

  const game = new Chess(
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  );
  game.header('White', `${whitePlayer}`);
  game.header('Black', `${blackPlayer}`);

  const pgn = game.pgn() + '\n*';

  try {
    const startTime = new Date(Date.now()).toISOString();

    const gameModel = await Game.create({
      whitePiecesUserId: whitePlayer,
      blackPiecesUserId: blackPlayer,
      startTime: startTime,
      description: pgn,
    });

    return res.json({ lobbyId: gameModel.id });
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }
};
