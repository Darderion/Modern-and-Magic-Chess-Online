const { ApiError } = require('./ApiError');

class ShopError extends ApiError {
  constructor(status, message) {
    super(status, message);
  }
}

class LackOfMoneyShopError extends ShopError {
  constructor(
    message = 'The user does not have enough money to make a purchase'
  ) {
    super(400, message);
  }
}

class NoAvailableStylesShopError extends ShopError {
  constructor(message = 'The user already has all the styles') {
    super(400, message);
  }
}

class LootboxNotFoundShopError extends ShopError {
  constructor(message = 'Lootbox not found') {
    super(400, message);
  }
}

module.exports = {
  ShopError,
  LackOfMoneyShopError,
  NoAvailableStylesShopError,
  LootboxNotFoundShopError,
};
