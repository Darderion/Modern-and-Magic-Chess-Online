const { Chess } = require('chess.js');

const { Game } = require('../../db/models');
const {
  DatabaseConnectionError,
} = require('../../validators/errors/ConnectionError');
const { PgnLoadingChessError } = require('../../validators/errors/ChessError');

const GameExecutor = require('../sharedFunctions/GameExecutor');

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
    });

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

  const { fieldsToUpdate, success, error } = GameExecutor.makeMove(
    game,
    from,
    to
  );

  if (!success) {
    return error.sendResponse(res);
  }

  if (fieldsToUpdate.result) {
    const operationInfo = await GameExecutor.addMoneyToPlayers(
      game,
      fieldsToUpdate.result
    );

    if (!operationInfo.success) {
      return operationInfo.error.sendResponse(res);
    }
  }

  try {
    await Game.update(fieldsToUpdate, {
      where: { id: lobbyId },
    });
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }

  const info = {
    game,
    lobbyId,
  };

  return res.json(info);
};
