const { Game } = require('../../db/models');
const {
  DatabaseConnectionError,
} = require('../../validators/errors/ConnectionError');

// TEST
// curl -X GET http://localhost:5000/api/gameStatus/1

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const gameModels = await Game.findAll({
      attributes: ['isFinished', 'winnerId'],
      where: { id },
    }); // SELECT isFinished FROM game WHERE id = $id;

    const { isFinished, winnerId } = gameModels[0];

    return res.json({
      isFinished,
      winnerId,
    });
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }
};
