const { Game } = require('../../../db/models');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const id = +req.params.id;
  const offset = req.query.offset ? +req.query.offset : 0;
  const limit = req.query.limit ? +req.query.limit : 0;

  const games = await Game.findAll({
    where: {
      [Op.or]: [{ firstUser: id }, { secondUser: id }],
      isFinished: 1,
    },
    order: [['finishTime', 'DESC']],
    offset: offset,
    limit: limit,
  });

  res.json(games);
};
