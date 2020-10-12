const asyncHandler = require("./async");


exports.cache = asyncHandler(async (req, res, next) => {
  console.log('in cache');
  console.log(req.params.rideId);
  //in here check redis contains the rideId and return it or simply do next()
  next();
})