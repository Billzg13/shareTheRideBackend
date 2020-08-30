const Sequelize = require('sequelize');
const db = require('../config/db');


const User = db.define('users', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
  timestamps: true
});

module.exports = User;