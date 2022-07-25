const { Game } = require('../../../db/models');

module.exports = async (req, res) => {
  const id = req.params.id;

  const game = await Game.findOne({
    where: {
      id,
    },
  });

  if (!game) {
    res.json('No game matches id');
  } else {
    res.json(game);
  }
};
