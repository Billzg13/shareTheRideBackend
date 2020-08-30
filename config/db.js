const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize('sharetheride', 'root', 'secret', {
  host: 'ec2-18-195-215-56.eu-central-1.compute.amazonaws.com',
  dialect: 'mysql',
  define: {
    // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
    // This was true by default, but now is false by default
    timestamps: false
  }
});