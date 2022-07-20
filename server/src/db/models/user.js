'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Game, userStyles }) {
      this.hasMany(userStyles, {foreignKey: 'userId'});
      this.hasMany(Game, {foreignKey: 'user1Id'});
      this.hasMany(Game, {foreignKey: 'user2Id'});
      this.hasMany(Game, {foreignKey: 'winnerId'});
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nick: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iconSrc: DataTypes.STRING,
    chessStyleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fieldStyleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
    modelName: 'User',
  });
  return User;
};