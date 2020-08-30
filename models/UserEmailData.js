const Sequelize = require('sequelize');
const db = require('../config/db');
const User = require('./User');

const UserEmailData = db.define('userEmailData', {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Option 1
User.hasOne(UserEmailData, {
  foreignKey: 'userId'
});
UserEmailData.belongsTo(User);


module.exports = UserEmailData;