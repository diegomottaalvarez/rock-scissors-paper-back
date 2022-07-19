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

async function playRound(req, res) {
  try {
    const { username, userPlay } = req.body;

    const currentGame = await RSPGame.findOne({
      username,
    });

    const game = currentGame || {
      username,
      lastPlayComputer: null,
      lastPlayUser: null,
      userWins: 0,
      computerWins: 0,
    };

    const computerPlay = getRandomItemWithException(game?.lastPlayComputer);
    const result = playRSP(userPlay, computerPlay);
    game.lastPlayUser = userPlay;
    game.lastPlayComputer = computerPlay;
    if (result === RSPGAME_RESULT_OPTIONS.USER_WIN) {
      game.userWins++;
    } else if (result === RSPGAME_RESULT_OPTIONS.COMPUTER_WIN) {
      game.computerWins++;
    }
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

    res.status(201).json({ game: newRound, result });
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

const playRSP = (userPlay, computerPlay) => {
  if (userPlay === computerPlay) {
    return RSPGAME_RESULT_OPTIONS.TIE;
  } else if (RSPGAME_WINS.get(userPlay) === computerPlay) {
    return RSPGAME_RESULT_OPTIONS.USER_WIN;
  } else {
    return RSPGAME_RESULT_OPTIONS.COMPUTER_WIN;
  }
};

const getRandomItemWithException = (lastItem) => {
  const possibleValues = Object.values(RSPGAME_VALUES).filter(
    (item) => item != lastItem
  );
  const randomIndex = Math.floor(Math.random() * possibleValues.length);
  return possibleValues[randomIndex];
};

module.exports = {
  playRound,
  createGame,
  getRanking,
  getRandomItemWithException,
  playRSP,
};
