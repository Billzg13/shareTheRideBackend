const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const UserDbo = require('../dbmodels/UserDbo')
const UserEmailData = require('../dbmodels/UserEmailData');
const UserFbData = require('../dbmodels/UserFbData');
const jwt = require('jsonwebtoken');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const {
    type,
    fbUserId,
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    gender
  } = req.body;
  if (type === 'fb') {
    if (await UserFbData.findOne({
        where: {
          fbUserId: fbUserId
        }
      })) {
      return next(new ErrorResponse('user already exists', 403));
    }
    const user = await UserDbo.create({
      type: "fb",
      email,
      firstName,
      lastName
    });
    console.log(user)
    const userFbData = await UserFbData.create({
      userId: user.id,
      fbUserId: fbUserId
    });

  } else if (type === 'email') {
    if (await UserEmailData.findOne({
        where: {
          email
        }
      })) {
      return next(new ErrorResponse('user already exists', 403));
    }
    const user = await UserDbo.create({
      type: "email",
      email,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      age: 23
    });
    const userEmailData = await UserEmailData.create({
      userId: user.id,
      email,
      password
    });
  } else {
    return (res.status(400).json({
      error: "bad info"
    }));
  }

  res.status(201).json({
    success: true
  });
});


// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const {
    type,
    fbUserId,
    email,
    password
  } = req.body;
  if (type === 'fb') {
    const userFbData = await UserFbData.findOne({
      where: {
        fbUserId
      }
    });
    if (!userFbData) {
      return next(new ErrorResponse('bad credentials', 401));
    }
    res.status(200).json({
      success: true,
      jwt: signJwt(userFbData.userId)
    })
  } else if (type === 'email') {
    if (!email || !password) {
      return next(new ErrorResponse('please provide credentials', 403));
    }

    const userEmailData = await UserEmailData.findOne({
      where: {
        email
      }
    });
    if (!userEmailData) {
      return next(new ErrorResponse('bad credentials', 401));
    }
    if (password === userEmailData.password) {
      //so if we are here the email and password are correct
      //return the jwt here
      res.status(200).json({
        success: true,
        jwt: signJwt(userEmailData.userId)
      });
    } else {
      return next(new ErrorResponse('bad credential', 401));
    }
  } else {
    return next(new ErrorResponse('please provide a correct login method', 400));
  }

});

signJwt = (userId) => {
  return jwt.sign({
    userId
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}