/**
 *  
 * 
 */
const RideSpot = require("../dbmodels/RideSpot");


function RideSpot() {
  this.tablename = "rideSpots";
}

module.exports = new RideSpot();

//we need 
//1. book a spot
//2. cancel a booking of a spot
//3. 