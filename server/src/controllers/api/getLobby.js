const { Game } = require('../../db/models');
const {
  DatabaseConnectionError,
} = require('../../validators/errors/ConnectionError');

// TEST
// curl -X GET http://localhost:5000/api/lobby/3

module.exports = async (req, res) => {
  const { id } = req.params;

  let gameModel;

  try {
    const gameModels = await Game.findAll({
      attributes: ['whitePiecesUserId', 'blackPiecesUserId', 'startTime'],
      where: { id },
    });

    gameModel = gameModels[0];
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }

  const { whitePiecesUserId, blackPiecesUserId, startTime } = gameModel;

  const lobby = {
    id,
    whitePiecesUserId,
    blackPiecesUserId,
    startTime,
  };

  return res.json(lobby);
};
