const { Game } = require('../db/models');
const { NotFoundLobbyError } = require('../validators/errors/LobbyError');
const {
  DatabaseConnectionError,
} = require('../validators/errors/ConnectionError');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  let exists = false;

  try {
    const gameModel = await Game.findAll({
      where: { id },
    });

    exists = gameModel.length > 0;
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }

  if (exists) {
    next();
  } else {
    const notFoundError = new NotFoundLobbyError();
    notFoundError.sendResponse(res);
  }
};
