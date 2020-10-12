const RideDbo = require('../dbmodels/RideDbo');
const User = require('./User');
const RideSpot = require('../dbmodels/RideSpot');
const Sequelize = require('sequelize');
const client = require('../config/redis');


function Ride() {
  this.tablename = "rides";
}
module.exports = new Ride();


Ride.prototype.createNewRide = async (ride) => {
  if (!ride) return null;
  try {
    const result = await RideDbo.create(ride);
    if (result) return result;

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

Ride.prototype.cachRide = async (cachedRide) => {
  let cacheTime = 3600;
  client.hmset('recentRide' + cachedRide.id, [
    'id', cachedRide.id,
    'userId', cachedRide.userId,
    'from', cachedRide.from,
    'to', cachedRide.to,
    'when', cachedRide.when,
    'spots', cachedRide.spots,
    'gassMoney', cachedRide.gassMoney,
    'comments', cachedRide.comments,
    'pets', cachedRide.pets
  ]);
  client.expire('recentRide' + cachedRide.id, cacheTime);
}

Ride.prototype.testMulti = async () => {
  client.multi(
    [
      ["hgetall", "recentRide25"],
      ["hgetall", "recentRide26"],
      ["hgetall", "recentRide27"],
    ]).exec(function (err, replies) {
    console.log(replies);
  });
}

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

Ride.prototype.getMyBookings = async (userId) => {
  return await RideSpot.findAll({
    where: {
      userId
    }
  })
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