const {Game, User} = require('../../../db/models');

module.exports = async (req, res) => {
    const offset = req.query.offset ? +req.query.offset : 0;
    const limit = req.query.limit ? +req.query.limit : 0;

    let games;

    if (limit <= 0) {
        games = await Game.findAll({
            include: [{model: User, as: 'black'}, {model: User, as: 'white'}],
            where: {
                isFinished: true,
            },
            order: [['id', 'ASC']],
            offset: offset,
        });
    } else {

        games = await Game.findAll({
            include: [{model: User, as: 'blackPiecesUserId'}, {model: User, as: 'whitePiecesUserId'}],
            where: {
                isFinished: true,
            },
            order: [['finishTime', 'ASC']],
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
