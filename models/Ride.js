const RideDbo = require('../dbmodels/RideDbo');
const User = require('./User');

function Ride() {
  this.tablename = "rides";
}
module.exports = new Ride();

Ride.prototype.createNewRide = async (ride) => {
  if (!ride) {
    //do something
    return null;
  }
  try {
    const result = await RideDbo.create(ride);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

Ride.prototype.getAllRides = async () => {
  return await RideDbo.findAll();
}

Ride.prototype.getMyRides = async (userId) => {
  return await RideDbo.findAll({
    where: {
      userId
    }
  });
}
// SELECT * FROM rides WHERE userId = ?;

Ride.prototype.findRide = async (from, destination, when) => {
  return await RideDbo.findAll({
    where: {
      from,
      destination,
      when
    }
  });
}
// SELECT * FROM rides WHERE from = ? AND destination = ? and when = ?;