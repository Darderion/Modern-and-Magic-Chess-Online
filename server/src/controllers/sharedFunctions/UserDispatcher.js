const { User } = require('../../db/models');
const { ApiError } = require('../../validators/errors/ApiError');

const {
  DatabaseConnectionError,
} = require('../../validators/errors/ConnectionError');

class UserDispatcher {
  constructor() {}

  async getMoney(userId) {
    try {
      const userModel = await User.findByPk(userId);

      if (userModel === null) {
        return {
          success: false,
          money: null,
          error: new ApiError(500, 'User not found'),
        };
      }

      return {
        success: true,
        money: userModel.money,
        error: null,
      };
    } catch (err) {
      return {
        success: false,
        money: null,
        error: new DatabaseConnectionError(err),
      };
    }
  }

  async increaseMoney(userId, money) {
    let newUserMoney;

    try {
      const userModel = await User.findByPk(userId);

      if (userModel === null) {
        return {
          success: false,
          newMoney: null,
          error: new ApiError(500, 'User not found'),
        };
      }

      newUserMoney = userModel.money + money;

      const updateInfo = await User.update(
        { money: newUserMoney },
        {
          where: { id: userId },
        }
      );

      if (updateInfo[0] === 0) {
        return {
          success: false,
          newMoney: null,
          error: new ApiError(500, 'Failed to update user info'),
        };
      }
    } catch (err) {
      return {
        success: false,
        newMoney: null,
        error: new DatabaseConnectionError(err),
      };
    }

    return {
      success: true,
      newMoney: newUserMoney,
      error: null,
    };
  }

  async decreaseMoney(userId, money) {
    return this.increaseMoney(userId, -money);
  }
}

module.exports = new UserDispatcher();
