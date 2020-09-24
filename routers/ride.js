const express = require('express');
const {
  protect,
  authorize
} = require('../middleware/auth');
const {
  createNewRide,
  getAllRides,
  bookSpot,
  getSingleRide,
  getMyRides,
  cancelSpot,
  deleteRide,
  findRide
} = require('../controllers/ride');

router = express.Router();

router.post('', protect, createNewRide);
router.get('', protect, getAllRides);
router.get('/me', protect, getMyRides);
router.post('/find', findRide);
router.post('/book', protect, bookSpot);
router.get('/single/:rideId', protect, getSingleRide);
router.delete('/delete/:rideId', protect, deleteRide);
router.get('/cancel/:rideId', protect, cancelSpot);

//create a ride
//search for rides(dont return the whole object maybe)
//get a spot for a ride
//get a single ride
//get my rides


module.exports = router;