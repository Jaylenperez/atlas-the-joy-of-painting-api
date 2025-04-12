const express = require('express');
const router = express.Router();
const { getSeasons } = require('../controllers/colors.controllers');

// Endpoint to get seasons
router.get('/seasons', getSeasons);

module.exports = router;

// http://localhost:5000/api/colors/seasons
