const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const {
  protect,
  authorize
} = require('./middleware/auth');

//import routers
const auth = require('./routers/auth');
const ride = require('./routers/ride');

// Load env vars
dotenv.config({
  path: './config/config.env'
});

const db = require('./config/db');
db.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));


//express app init
const app = express();

//dev logging
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

//body parser
app.use(express.json());


//routes for auth
app.use('/api/v1/auth', auth);
app.use('/api/v1/rides', ride);

app.get('/protected', protect, (req, res, next) => {
  console.log(req.user.firstName)
  res.status(200).json({
    protected: "yes",
    user: req.user
  });
});


app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});