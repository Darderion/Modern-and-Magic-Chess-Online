const { Lootbox, LootboxStyles } = require('../../db/models');

const {
  DatabaseConnectionError,
} = require('../../validators/errors/ConnectionError');

const {
  EmptyStylesLootboxError,
  IncorrectPriceLootboxError,
} = require('../../validators/errors/LootboxError');

class LootboxCreator {
  constructor() {}

  async create(price, styleIds) {
    if (price <= 0) {
      const incorrectPriceError = new IncorrectPriceLootboxError();
      return { error: incorrectPriceError };
    }

    if (styleIds.length === 0) {
      const emptyStylesError = new EmptyStylesLootboxError();
      return { error: emptyStylesError };
    }

    try {
      const lootboxModel = await Lootbox.create({ price });
      const lootboxId = lootboxModel.id;

      for (const styleId of styleIds) {
        await LootboxStyles.create({
          lootboxId,
          styleId,
        });
      }

      return lootboxId;
    } catch (err) {
      const databaseError = new DatabaseConnectionError(err);
      return { error: databaseError };
    }
  }
}

module.exports = new LootboxCreator();
