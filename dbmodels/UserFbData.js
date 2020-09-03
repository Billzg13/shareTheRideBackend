const Sequelize = require('sequelize');
const {
  DataTypes
} = require("sequelize");
const db = require('../config/db');
const UserDbo = require('./UserDbo');

const UserFbData = db.define('userFbData', {
  // attributes
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: 'users',
    referencesKey: 'id'
  },
  fbUserId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

// Option 1
UserDbo.hasOne(UserFbData, {
  foreignKey: 'userId'
});
UserFbData.belongsTo(UserDbo);



module.exports = UserFbData;