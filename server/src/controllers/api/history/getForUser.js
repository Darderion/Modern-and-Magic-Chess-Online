const {Game, User} = require('../../../db/models');
const {Op} = require('sequelize');

module.exports = async (req, res) => {
    const id = +req.params.id;
    const offset = req.query.offset ? +req.query.offset : 0;
    const limit = req.query.limit ? +req.query.limit : 0;

    let games;

    if (limit <= 0) {
        games = await Game.findAll({
            include: User,
            where: {
                [Op.or]: [{whitePiecesUserId: id}, {blackPiecesUserId: id}],
                isFinished: true,
            },
            order: [['finishTime', 'DESC']],
            offset: offset,

        });
    } else {
        games = await Game.findAll({
            include: User,
            where: {
                [Op.or]: [{whitePiecesUserId: id}, {blackPiecesUserId: id}],
                isFinished: true,
            },
            order: [['finishTime', 'DESC']],
            offset: offset,
            limit: limit,

        });

    }

    if (!games) {
        res.json("Nothing found!");
    } else {
        res.json(games);
    }

};
