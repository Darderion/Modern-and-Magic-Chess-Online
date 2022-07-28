const { LootboxStyles } = require('../../db/models');

const {
  LootboxNotFoundShopError,
} = require('../../validators/errors/ShopError');

const {
  DatabaseConnectionError,
} = require('../../validators/errors/ConnectionError');

// TEST
// curl -X GET http://localhost:5000/shop/getLootboxStyles/1

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const stylesModels = await LootboxStyles.findAll({
      where: { lootboxId: id },
    });

    if (stylesModels.length === 0) {
      const lootboxError = new LootboxNotFoundShopError();
      return lootboxError.sendResponse(res);
    }

    return res.json({ stylesModels });
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }
};
