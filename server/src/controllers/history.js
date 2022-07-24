const { Game } = require('../db/models');


class HistoryController {

    async getGameHistory(req, res) {
        const gameId = req.params.id;

        const game = await Game.findOne( {
            where : {
                id : gameId
            }
        });

        console.log(game);

        if (!game) {
            throw new Error('No game matches id');
        }
        else {
            res.json(game);
        }

    }

    async setGameHistory(req, res) {
        const gameId = req.params.id;
        const {description} = req.body;

        const game = await Game.findOne( {
            where : {
                id : gameId,
            },
        });

        if (!game) {
            throw new Error('No game matches id');
        }
        else {
            const upd = await Game.update({
                description : description
            },
            {
                where : { id : gameId }
            });

            res.json(upd);
        }
    }


}

module.exports = new HistoryController();
