const Sequelize = require('sequelize');
const {
  DataTypes
} = require("sequelize");
const db = require('../config/db');
const UserDbo = require('./UserDbo');

const UserEmailData = db.define('userEmailData', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Option 1
UserDbo.hasOne(UserEmailData, {
  foreignKey: 'userId'
});
UserEmailData.belongsTo(UserDbo);


module.exports = UserEmailData;