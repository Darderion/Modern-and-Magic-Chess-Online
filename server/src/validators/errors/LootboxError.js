const { ApiError } = require('./ApiError');

class LootboxError extends ApiError {
  constructor(status, message) {
    super(status, message);
  }
}

class EmptyStylesLootboxError extends LootboxError {
  constructor(message = 'The lootbox must contain at least one style') {
    super(500, message);
  }
}

class IncorrectPriceLootboxError extends LootboxError {
  constructor(message = 'The price of the lootbox must be greater than zero') {
    super(500, message);
  }
}

module.exports = {
  LootboxError,
  EmptyStylesLootboxError,
  IncorrectPriceLootboxError,
};
