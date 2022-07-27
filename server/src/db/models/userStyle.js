'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userStyle extends Model {}

  userStyle.init(
    {
      isSelected: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'userStyle',
      modelName: 'UserStyle',
    }
  );
  return userStyle;
};
