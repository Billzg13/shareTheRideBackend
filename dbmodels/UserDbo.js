const Sequelize = require('sequelize');
const {
  DataTypes
} = require("sequelize");
const db = require('../config/db');


const UserDbo = db.define('users', {
  // attributes
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
  timestamps: true
});


module.exports = UserDbo;