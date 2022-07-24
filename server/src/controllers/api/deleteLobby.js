const { Game } = require('../../db/models');
const {
  DatabaseConnectionError,
} = require('../../validators/errors/ConnectionError');

// TEST
// curl -X DELETE http://localhost:5000/api/lobbies/4

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const isDeleted = await Game.destroy({
      where: { id: id },
    });

    res.json({ success: Boolean(isDeleted) });
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }
};
