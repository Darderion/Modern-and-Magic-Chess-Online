const { Game } = require('../../../db/models');

module.exports = async (req, res) => {
  const offset = req.query.offset ? +req.query.offset : 0;
  const limit = req.query.limit ? +req.query.limit : 0;

  const games = await Game.findAll({
    where: {
      isFinished: true,
    },
    order: [['finishTime', 'DESC']],
    offset: offset,
    limit: limit,
  });

  res.json(games);
};
