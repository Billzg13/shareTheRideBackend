const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const UserDbo = require('../dbmodels/UserDbo')
const UserEmailData = require('../dbmodels/UserEmailData');
const UserFbData = require('../dbmodels/UserFbData');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

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
    age,
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
      gender,
      age
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
    //  if (password === userEmailData.password) {

    if (await bcrypt.compare(password, userEmailData.password)) {

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

// @desc      when a user forgets his password
// @route     POST /api/v1/auth/forgot/password
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const {
    email
  } = req.body;
  if (!email) return next(new ErrorResponse('no email provided', 400));

  //find userEmailData by email
  const userEmailData = await User.findUserByEmail(email);
  if (!userEmailData) return next(new ErrorResponse('cant find the email', 400));

  //generate new random password
  const newPassword = makeId(8);
  userEmailData.password = newPassword;
  //save the new password
  await userEmailData.save();

  res.status(200).json({
    success: true,
    message: "please check your emails"
  });
  //send the new password to his email
  //return 200 success
});

// @desc      Change password for the user
// @route     POST /api/v1/auth/change/pass
// @access    Private
exports.changePassword = asyncHandler(async (req, res, next) => {
  const {
    oldPassword,
    newPassword
  } = req.body;
  const userId = req.user.id;

  console.log('in changePassword')
  const userEmailData = await User.findByUserId(userId);
  if (!userEmailData) return next(new ErrorResponse('user doesnt exist?', 400));

  if (await bcrypt.compare(oldPassword, userEmailData.password)) {
    userEmailData.password = newPassword;
    await userEmailData.save();
    console.log('after userEmaildata.save()');
    console.log('with password: ' + userEmailData.password)
    res.status(200).json({
      success: true,
      message: "password changed"
    });
  }
  return next(new ErrorResponse('wrong password', 401));


  //we find the userEmailData with email and password
  //we then store the new password userEmailData.password
  //save the 
})

//creates the jwt
signJwt = (userId) => {
  return jwt.sign({
    userId
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}


//this function is used to generate random password with any length
makeId = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


//send email util, maybe dont have this function here since it could be used widely
sendEmail = (email, body) => {
  const message = {
    from: 'elonmusk@tesla.com', // Sender address
    to: 'to@email.com', // List of recipients
    subject: 'Design Your Model S | Tesla', // Subject line
    text: body // Plain text body
  };
}