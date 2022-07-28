const { Chess } = require('chess.js');

const { Game } = require('../../db/models');
const {
  DatabaseConnectionError,
} = require('../../validators/errors/ConnectionError');
const { PgnLoadingChessError } = require('../../validators/errors/ChessError');

const GameExecutor = require('../sharedFunctions/GameExecutor');
const UserDispatcher = require('../sharedFunctions/UserDispatcher');

// TEST
// curl -X POST -H "Content-Type: application/json" -d '{"lobbyId": "2", "from": "a2", "to": "a3"}' http://localhost:5000/api/makeMove

module.exports = async (req, res) => {
  const { lobbyId, from, to } = req.body;

  let gameModel;
  let whitePiecesUserId, blackPiecesUserId, pgn;

  const game = new Chess();

  try {
    const gameModels = await Game.findAll({
      attributes: ['whitePiecesUserId', 'blackPiecesUserId', 'description'],
      where: { id: lobbyId },
    });

    gameModel = gameModels[0];

    pgn = gameModel.description;
    whitePiecesUserId = gameModel.whitePiecesUserId;
    blackPiecesUserId = gameModel.blackPiecesUserId;

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
    let whitePlayerProfit, blackPlayerProfit;

    if (fieldsToUpdate.result === 'white') {
      whitePlayerProfit = 100;
      blackPlayerProfit = 25;
    } else if (fieldsToUpdate.result === 'black') {
      whitePlayerProfit = 25;
      blackPlayerProfit = 100;
    } else {
      whitePlayerProfit = 50;
      blackPlayerProfit = 50;
    }

    const opInfo1 = await UserDispatcher.increaseMoney(
      whitePiecesUserId,
      whitePlayerProfit
    );

    if (!opInfo1.success) {
      return opInfo1.error.sendResponse(res);
    }

    const opInfo2 = await UserDispatcher.increaseMoney(
      blackPiecesUserId,
      blackPlayerProfit
    );

    if (!opInfo2.success) {
      return opInfo2.error.sendResponse(res);
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
