'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      //
    }
  }
  Game.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      secondUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      finishTime: DataTypes.DATE,
      isFinished: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      winnerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'game',
      modelName: 'Game',
    }
  );
  return Game;
};
