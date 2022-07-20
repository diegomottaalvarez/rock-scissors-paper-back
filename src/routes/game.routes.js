const { Router } = require('express');
const {
  save,
  createGame,
  getRanking,
} = require('../controllers/rsp-game.controller');

const gameRoutes = Router({ mergeParams: true });

gameRoutes.post('/', createGame);
gameRoutes.post('/save', save);
gameRoutes.get('/ranking/:amount', getRanking);

module.exports = { gameRoutes };
