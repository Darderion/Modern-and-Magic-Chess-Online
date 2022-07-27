const {
  User,
  Lootbox,
  UserStyle,
  LootboxStyles,
  Style,
} = require('../../db/models');

const {
  DatabaseConnectionError,
} = require('../../validators/errors/ConnectionError');

const {
  LackOfMoneyShopError,
  NoAvailableStylesShopError,
  LootboxNotFoundShopError,
} = require('../../validators/errors/ShopError');

// TEST
// curl -X POST http://localhost:5000/shop/buyLootbox/1

module.exports = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  let userModel, lootboxModel;
  let userStyleModels, lootboxStylesModels;

  try {
    userModel = await User.findOne({
      attributes: ['money'],
      where: { id: userId },
    });

    lootboxModel = await Lootbox.findOne({
      attributes: ['price'],
      where: { id },
    });

    userStyleModels = await UserStyle.findAll({
      attributes: ['StyleId'],
      where: { UserId: userId },
    });

    lootboxStylesModels = await LootboxStyles.findAll({
      attributes: ['styleId'],
      where: { lootboxId: id },
    });
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }

  if (lootboxModel === null) {
    const lootboxError = new LootboxNotFoundShopError();
    return lootboxError.sendResponse(res);
  }

  const userMoney = userModel.money;
  const lootboxPrice = lootboxModel.price;
  const userRemainingMoney = userMoney - lootboxPrice;

  if (userMoney < lootboxPrice) {
    const moneyError = new LackOfMoneyShopError();
    return moneyError.sendResponse(res);
  }

  const allUserStyles = userStyleModels.map((t) => t.StyleId);
  const allLootboxStyles = lootboxStylesModels.map((t) => t.styleId);
  const availableStyles = allLootboxStyles.filter(
    (t) => !allUserStyles.includes(t)
  );

  if (availableStyles.length === 0) {
    const noAvailableStyles = new NoAvailableStylesShopError();
    return noAvailableStyles.sendResponse(res);
  }

  const fellStyleIndex = Math.floor(Math.random() * availableStyles.length);
  const fellStyle = availableStyles[fellStyleIndex];

  let style;

  try {
    UserStyle.create({
      UserId: userId,
      StyleId: fellStyle,
      isSelected: 0,
    });

    User.update(
      { money: userRemainingMoney },
      {
        where: { id: userId },
      }
    );

    style = await Style.findByPk(fellStyle);
  } catch (err) {
    const databaseError = new DatabaseConnectionError(err);
    return databaseError.sendResponse(res);
  }

  return res.json({ style });
};
