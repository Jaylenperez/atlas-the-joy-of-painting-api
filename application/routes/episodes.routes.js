const express = require('express');
const router = express.Router();
const { getYears, getMonths } = require('../controllers/episodes.controllers');

// Endpoint to get years
router.get('/years', getYears);

// Endpoint to get months
router.get('/months', getMonths);

module.exports = router;

// http://localhost:5000/api/episodes/years
// http://localhost:5000/api/episodes/months
