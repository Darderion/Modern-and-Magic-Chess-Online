const { Game } = require('../../../db/models');

module.exports = async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  const game = await Game.findOne({
    where: {
      id,
    },
  });

  if (!game) {
    res.json('No game matches id');
  } else {
    const updatedInfo = await Game.update(
      {
        description,
      },
      {
        where: id,
      }
    );

    res.json(updatedInfo);
  }
};
