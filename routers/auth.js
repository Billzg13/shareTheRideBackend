const express = require('express');
const {
  register,
  login,
  forgotPassword,
  changePassword
} = require('../controllers/auth');
const {
  protect
} = require('../middleware/auth');

router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/change/pass', protect, changePassword);
router.post('/forgot/pass', forgotPassword)

//forgot pass POST /api/v1/auth/forgot/password
//change password  POST /api/v1/auth/change/pass


module.exports = router;