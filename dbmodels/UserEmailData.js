const Sequelize = require('sequelize');
const {
  DataTypes
} = require("sequelize");
const bcrypt = require('bcrypt');
const db = require('../config/db');
const UserDbo = require('./UserDbo');
const User = require('../models/User');

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

UserEmailData.beforeCreate(async (userEmailData, options) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userEmailData.password, salt);
  userEmailData.password = hashedPassword;
});

UserEmailData.beforeSave(async (userEmailData, options) => {
  if (userEmailData.password.length > 20) {
    //then its hashed?

  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userEmailData.password, salt);
    userEmailData.password = hashedPassword;
  }
});



// Option 1
UserDbo.hasOne(UserEmailData, {
  foreignKey: 'userId'
});
UserEmailData.belongsTo(UserDbo);


module.exports = UserEmailData;