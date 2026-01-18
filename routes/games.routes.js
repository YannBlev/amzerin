const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/games.controller');
router.get('/', gamesController.list);
router.get('/:slug', gamesController.show);
module.exports = router;