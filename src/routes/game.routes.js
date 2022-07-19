const { Router } = require('express');
const {
  playRound,
  createGame,
  getRanking,
} = require('../controllers/rsp-game.controller');

const gameRoutes = Router({ mergeParams: true });

gameRoutes.post('/', createGame);
gameRoutes.post('/playRound', playRound);
gameRoutes.get('/ranking', getRanking);

module.exports = { gameRoutes };
