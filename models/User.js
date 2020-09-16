const UserDbo = require('../dbmodels/UserDbo');
const UserEmailData = require('../dbmodels/UserEmailData');

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

User.prototype.findUserByEmail = async (email) => {
  const userEmailData = await UserEmailData.findOne({
    where: {
      email
    }
  });
  if (userEmailData) return userEmailData;

  return null;
}

User.prototype.findByUserId = async (userId) => {
  const userEmailData = await UserEmailData.findByPk(userId);
  if (!userEmailData) return null;

  return userEmailData;
}