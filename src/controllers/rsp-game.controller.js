const response = require('express');
const RSPGame = require('../models/RSPGame.model');
const {
  RSPGAME_VALUES,
  RSPGAME_WINS,
  RSPGAME_RESULT_OPTIONS,
} = require('../models/RSPGame.utils');

async function createGame(req, res) {
  try {
    const { username } = req.body;
    let game = await RSPGame.findOne({
      username,
    });

    if (!game) {
      game = new RSPGame({ username });
      await game.save();
    }
    return res.status(201).json(game);
  } catch (error) {}
}

async function save(req, res) {
  try {
    const { game } = req.body;
    const { username } = game;

    const currentGame = await RSPGame.findOne({
      username,
    });
    let newRound;
    if (!currentGame) {
      console.log('newGame', game);
      newRound = new RSPGame(game);
      await newRound.save();
    } else {
      newRound = await RSPGame.findOneAndUpdate(
        {
          username,
        },
        game,
        { new: true }
      );
    }

    res.status(201).json({ game: newRound });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
}

async function getRanking(req, res = response) {
  try {
    const { amount } = req.params;

    const ranking = await RSPGame.find().sort({ userWins: -1 }).limit(amount);
    res.status(201).json(ranking);
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = {
  save,
  createGame,
  getRanking,
};
