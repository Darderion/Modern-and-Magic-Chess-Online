const { Game } = require('../../db/models');
const {
  DatabaseConnectionError,
} = require('../../validators/errors/ConnectionError');

// TEST
// curl -X GET http://localhost:5000/api/lobbies

module.exports = async (req, res) => {
  let gameModels;

  try {
    gameModels = await Game.findAll({
      attributes: ['id', 'whitePiecesUserId', 'blackPiecesUserId', 'startTime'],
      where: { isFinished: false },
    });
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }
  const lobbies = gameModels.map(
    ({ id, whitePiecesUserId, blackPiecesUserId, startTime }) => {
      return {
        id,
        whitePiecesUserId,
        blackPiecesUserId,
        startTime,
      };
    }
  );
  return res.json(lobbies);
};
