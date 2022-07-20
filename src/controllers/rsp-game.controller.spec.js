const {
  RSPGAME_VALUES,
  RSPGAME_RESULT_OPTIONS,
} = require('../models/RSPGame.utils');
const { SpecReporter } = require('jasmine-spec-reporter');
jasmine
  .getEnv()
  .addReporter(new SpecReporter({ spec: { displayStacktrace: 'pretty' } }));
var app = require('./rsp-game.controller');

describe('Game controller tests', function () {
  //   it('should create a computer response different from the previous one', () => {
  //     const firstComputerPlay = app.getRandomItemWithException(null);
  //     const secondComputerPlay =
  //       app.getRandomItemWithException(firstComputerPlay);
  //     expect(secondComputerPlay).not.toBe(firstComputerPlay);
  //   });
  //   it('should rock win to scissors', () => {
  //     const userPlay = RSPGAME_VALUES.ROCK;
  //     const computerPlay = RSPGAME_VALUES.SCISSORS;
  //     const result = app.playRSP(userPlay, computerPlay);
  //     expect(result).toBe(RSPGAME_RESULT_OPTIONS.USER_WIN);
  //   });
  //   it('should scissors win to paper', () => {
  //     const userPlay = RSPGAME_VALUES.SCISSORS;
  //     const computerPlay = RSPGAME_VALUES.PAPER;
  //     const result = app.playRSP(userPlay, computerPlay);
  //     expect(result).toBe(RSPGAME_RESULT_OPTIONS.USER_WIN);
  //   });
  //   it('should paper win to rock', () => {
  //     const userPlay = RSPGAME_VALUES.PAPER;
  //     const computerPlay = RSPGAME_VALUES.ROCK;
  //     const result = app.playRSP(userPlay, computerPlay);
  //     expect(result).toBe(RSPGAME_RESULT_OPTIONS.USER_WIN);
  //   });
});
