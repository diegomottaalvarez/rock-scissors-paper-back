const { Router } = require('express');
const { playRound, createGame } = require('../controllers/rsp-game.controller');

const gameRoutes = Router({ mergeParams: true });

gameRoutes.post('/', createGame);
gameRoutes.post('/playRound', playRound);

module.exports = { gameRoutes };
