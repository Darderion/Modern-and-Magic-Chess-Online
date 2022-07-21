'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Style extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, userStyles}) {
      this.hasMany(userStyles, {foreignKey: 'styleId'});
      this.hasMany(User, {foreignKey: 'chessStyleId'});
      this.hasMany(User, {foreignKey: 'fieldStyleId'});
    }
  }
  Style.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fieldId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isForBlack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shapeType: {
      type: DataTypes.INTEGER,
      allowNull: true //null for fields
    }
  }, {
    sequelize,
    tableName: 'style',
    modelName: 'Style',
  });
  return Style;
};
