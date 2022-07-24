const { Game } = require('../../db/models');

class HistoryController {
  async getGameHistory(req, res) {
    const id = req.params.id;

    const game = await Game.findOne({
      where: {
        id,
      },
    });

    if (!game) {
      res.json('No games matches id');
    } else {
      res.json(game);
    }
  }

  async setGameHistory(req, res) {
    const id = req.params.id;
    const { description } = req.body;

    const game = await Game.findOne({
      where: {
        id,
      },
    });

    if (!game) {
      res.json('No games matches id');
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
  }
}

module.exports = new HistoryController();
