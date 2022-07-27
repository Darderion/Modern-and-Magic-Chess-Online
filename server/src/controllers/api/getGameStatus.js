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
      attributes: ['isFinished', 'result'],
      where: { id },
    });

    const { isFinished, result } = gameModels[0];

    return res.json({
      isFinished,
      result,
    });
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }
};
