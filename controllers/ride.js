const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const UserDbo = require('../dbmodels/UserDbo');
const User = require('../models/User');
const Ride = require('../models/Ride');

/**
 *  Create a new Ride
 */
exports.createNewRide = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const {
    spots,
    when,
    from,
    to,
    gassMoney,
    comments,
    pets
  } = req.body;

  let newRide = {
    userId: user.id,
    from,
    to,
    when,
    spots,
    gassMoney,
    comments,
    pets
  };
  const result = await Ride.createNewRide(newRide);
  if (result == null) return next(new ErrorResponse('something went wrong', 400))

  res.status(201).json({
    route: 'createNewRide',
    result,
    success: true
  });
});

exports.getAllRides = asyncHandler(async (req, res, next) => {
  const result = await Ride.getAllRides();

  res.status(200).json({
    route: 'getAllRides',
    result,
    success: true
  });
});

exports.coverSpot = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    route: 'coverSpot',
    success: true
  });
});

exports.getSingleRide = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    route: 'getSingleRide',
    success: true
  });
});

exports.getMyRides = asyncHandler(async (req, res, next) => {
  const {
    id
  } = req.user;

  console.log('this is the userId: ' + id);
  const result = await Ride.getMyRides(id);

  res.status(200).json({
    route: 'getMyRides',
    result,
    success: true
  });
});

exports.cancelSpot = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    route: 'getMyRides',
    success: true
  });
});

exports.deleteRide = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    route: 'deleteRide',
    success: true
  });
});

exports.findRide = asyncHandler(async (req, res, next) => {
  const {
    from,
    to,
    when,
    spots
  } = req.body;

  if (!from || !to || !when || !spots)
    return next(new ErrorResponse('i dont know what to search', 400));

  const result = await Ride.findRide(from, to, when, spots);

  res.status(200).json({
    route: 'findRide',
    result,
    success: true
  });
});