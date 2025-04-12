const express = require('express');
const router = express.Router();
const { getSubjects } = require('../controllers/subjects.controllers');

// Endpoint to get subjects
router.get('/subject', getSubjects);


module.exports = router;

// http://localhost:5000/api/subjects/subject
