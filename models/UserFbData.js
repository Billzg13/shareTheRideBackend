const Sequelize = require('sequelize');
const db = require('../config/db');
const User = require('./User');

const UserFbData = db.define('userFbData', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
    references: 'users',
    referencesKey: 'id'
  },
  fbUserId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

// Option 1
User.hasOne(UserFbData, {
  foreignKey: 'userId'
});
UserFbData.belongsTo(User);



module.exports = UserFbData;