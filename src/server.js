const express = require('express');
const cors = require('cors');
const { gameRoutes } = require('./routes/game.routes');

const app = express();

app.set('port', process.env.PORT || 4000);

// CORS
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.use('/api/game/', gameRoutes);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

module.exports = app;
