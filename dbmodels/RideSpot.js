const Sequelize = require('sequelize');
const {
  DataTypes
} = require("sequelize");
const db = require('../config/db');
const UserDbo = require('./UserDbo');
const RideDbo = require('./RideDbo');

const RideSpot = db.define('rideSpots', {
  // attributes
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  rideId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: 'rides',
    referencesKey: 'id'
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: 'users',
    referencesKey: 'id'
  },
  requestedAt: {
    type: DataTypes.DATE,
    allowNull: false
    //maybe add default value here for the date
  },
  hasBaggage: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    //add default here ?
  },
  spots: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
  timestamps: false,
  tableName: 'rideSpots'
});

UserDbo.hasMany(RideSpot, {
  foreignKey: 'userId'
});
RideSpot.belongsTo(UserDbo);

RideDbo.hasMany(RideSpot, {
  foreignKey: 'rideId'
});
RideSpot.belongsTo(RideDbo);

module.exports = RideDbo;