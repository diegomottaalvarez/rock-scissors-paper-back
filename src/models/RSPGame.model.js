const { Schema, model } = require('mongoose');

const RSPGameSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    userWins: {
      type: Number,
      required: true,
      default: 0,
    },
    computerWins: {
      type: Number,
      required: true,
      default: 0,
    },
    lastPlayUser: {
      type: String,
      default: null,
    },
    lastPlayComputer: {
      type: String,
      default: null,
    },
  },
  { collection: 'games' }
);

module.exports = model('RSPGame', RSPGameSchema);
