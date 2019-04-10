const express = require('express');
const app = express();
const logger = require('morgan');

const userRoutes = require('./api/routes/users');
const gameRoutes = require('./api/routes/games');

// middleware - log out incoming requests
app.use(logger('dev'));

// middleware - takes info passed in through the body (possible without bodyParser, but eases it for us.)
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// middleware - adds headers to allow CORS.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
    res.status(200).json({});
  }
  next();
});

// middleware - filter all requests for users to the userRoutes
app.use('/api/v1/users', userRoutes);
// middleware - filter all requests for users to the userRoutes
app.use('/api/v1/games', gameRoutes);

// middleware - catch any requests that aren't caught by previous filters
app.use((req, res, next) => {
  const error = new Error('Not route found');
  error.status = 404;
  next(error);
});

// middleware - catch any errors that happen other places in the application (DB, etc.)
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message }
  });
});

module.exports = app;


// app.get('/api/v1/games/:gameId', (req, res) => {
//   const game = bgg.getGame(req.params.gameId);
//   game.then((data) => {
//     res.send(data);
//   })
// })