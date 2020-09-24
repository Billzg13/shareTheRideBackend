const RideDbo = require('../dbmodels/RideDbo');
const User = require('./User');
const RideSpot = require('../dbmodels/RideSpot');
const Sequelize = require('sequelize');

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

Ride.prototype.findRide = async (from, to, when, spots) => {
  return await RideDbo.findAll({
    where: {
      from,
      to,
      when,
      spots: {
        [Sequelize.Op.gt]: 0
      }
    }
  });
}
// SELECT * FROM rides WHERE from = ? AND to = ? and when = ? and spots > 0;

Ride.prototype.bookSpot = async (newBooking) => {
  console.log('in rideSpot');
  return await RideSpot.create(newBooking);
}

Ride.prototype.updateSpots = async (rideId, spots) => {
  console.log('in updateSpots');
  return await RideDbo.update({
    spots
  }, {
    where: {
      id: rideId
    }
  });
}