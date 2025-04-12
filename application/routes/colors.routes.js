const express = require('express');
const router = express.Router();
const { getSeasons, getColors } = require('../controllers/colors.controllers');

// Endpoint to get seasons
router.get('/seasons', getSeasons);

// Endpoint for get colors
router.get('/colors', getColors);

module.exports = router;

// http://localhost:5000/api/colors/seasons
// http://localhost:5000/api/colors/colors

