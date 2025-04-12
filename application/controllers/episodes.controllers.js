const pool = require('../db'); // assuming your database connection is in db.js
const { status } = require('http-status');
const { CustomError } = require('../middlewares/errorhandler');
const { rawListeners } = require('../app');

// Function for retrieving years
const getYears = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT DISTINCT year FROM episodes ORDER BY year ASC');
        res.status(status.OK).json({ data: result.rows });
    } catch (error) {
        next(error);
    }
};

// Function for retrieving months
const getMonths = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT DISTINCT month FROM episodes ORDER BY month ASC');
        res.status(status.OK).json({ data: result.rows });
    } catch (error) {
        next(error);
    }
};

module.exports = { getYears, getMonths };
