const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize('sharetheride', 'root', '1q2w3e4r5t6y7u8i9o0p', {
  host: '18.195.215.56',
  dialect: 'mysql',
  port: 3306,
  define: {
    // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
    // This was true by default, but now is false by default
    timestamps: false
  },

});