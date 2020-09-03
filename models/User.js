const UserDbo = require('../dbmodels/UserDbo')

function User() {
  this.tableName = "users";
}
module.exports = new User();

//still testing this
User.prototype.createUser = async function (user) {
  if (!user) {
    //do something 
    //UserDbo.
    return;
  }

  return;
};