const express = require('express');
const {
  protect,
  authorize
} = require('../middleware/auth');

const {
  cache
} = require('../middleware/caching');
const {
  createNewRide,
  getAllRides,
  bookSpot,
  getSingleRide,
  getMyRides,
  cancelSpot,
  deleteRide,
  findRide,
  getMyBookings
} = require('../controllers/ride');

router = express.Router();

router.post('', protect, createNewRide);
router.get('', protect, getAllRides);
router.get('/me', protect, getMyRides);
router.post('/find', findRide);
router.post('/book', protect, bookSpot);
router.get('/bookings', protect, getMyBookings);
router.get('/single/:rideId', protect, cache, getSingleRide);
router.delete('/delete/:rideId', protect, deleteRide);
router.get('/cancel/:rideId', protect, cancelSpot);


module.exports = router;