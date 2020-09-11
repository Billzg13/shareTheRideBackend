const Sequelize = require('sequelize');
const {
  DataTypes
} = require("sequelize");

const db = require('../config/db');
const UserDbo = require('./UserDbo');


const RideDbo = db.define('rides', {
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
  from: {
    type: DataTypes.STRING,
    allowNull: false
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false
  },
  when: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  spots: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gasMoney: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pets: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
  timestamps: false,
  tableName: 'rides'
});

// Option 1
UserDbo.hasMany(RideDbo, {
  foreignKey: 'userId'
});
RideDbo.belongsTo(UserDbo);

module.exports = RideDbo;