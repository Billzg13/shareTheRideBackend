const Ride = require('../models/Ride');

test('fails to create because ride is empty ', async () => {
  await expect(Ride.createNewRide(null)).rejects.toThrow('ride is null');
});