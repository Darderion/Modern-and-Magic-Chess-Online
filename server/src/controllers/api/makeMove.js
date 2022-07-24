const { Chess } = require('chess.js');

const { Game } = require('../../db/models');
const {
  DatabaseConnectionError,
} = require('../../validators/errors/ConnectionError');
const {
  PgnLoadingChessError,
  MakeMoveChessError,
} = require('../../validators/errors/ChessError');

const DateConverter = require('../../middlewares/DateConverter');

// TEST
// curl -X POST -H "Content-Type: application/json" -d '{"lobbyId": "2", "from": "a2", "to": "a3"}' http://localhost:5000/api/makeMove

module.exports = async (req, res) => {
  const { lobbyId, from, to } = req.body;

  let gameModel;
  let pgn;

  const game = new Chess();

  try {
    const gameModels = await Game.findAll({
      attributes: ['description'],
      where: { id: lobbyId },
    }); // SELECT firstUser, secondUser, history FROM game WHERE id = $lobbyId;

    gameModel = gameModels[0];
    pgn = gameModel.description;

    if (!game.load_pgn(pgn)) {
      const pgnError = new PgnLoadingChessError();
      return pgnError.sendResponse(res);
    }
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }

  const currPiece = game.get(from);

  if (currPiece === null) {
    const moveError = new MakeMoveChessError();
    return moveError.sendResponse(res);
  }

  const move = game.move({
    from: from,
    to: to,
  });

  if (move === null) {
    const moveError = new MakeMoveChessError();
    return moveError.sendResponse(res);
  }

  let winnerId = null;
  const newPgn = game.pgn();

  if (game.game_over()) {
    const header = game.header();

    winnerId =
      game.turn() === 'w' ? Number(header.Black) : Number(header.White);
  }

  const newFields = game.game_over()
    ? {
        isFinished: 1,
        finishTime: DateConverter.toDatabaseDateTime(new Date()),
        description: newPgn,
        winnerId: winnerId,
      }
    : { description: newPgn };

  try {
    await Game.update(newFields, {
      where: { id: lobbyId },
    });
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }

  const info = {
    move: move,
    turn: game.turn(),
    isFinished: game.game_over(),
    board: game.board(),
  };

  return res.json(info);
};
