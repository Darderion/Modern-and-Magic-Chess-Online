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
      attributes: ['id', 'firstUser', 'secondUser', 'startTime'],
      where: { isFinished: 0 },
    });
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }

  const lobbies = gameModels.map(({ id, firstUser, secondUser, startTime }) => {
    id, firstUser, secondUser, startTime;
  });

  return res.json(lobbies);
};
