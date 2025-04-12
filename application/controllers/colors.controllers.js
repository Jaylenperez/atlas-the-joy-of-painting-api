const pool = require('../db'); // assuming your database connection is in db.js
const { status } = require('http-status');
const { CustomError } = require('../middlewares/errorhandler');
const { rawListeners } = require('../app');

// Function for retrieving seasons
const getSeasons = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT DISTINCT season FROM colors ORDER BY season ASC');
        res.status(status.OK).json({ data: result.rows });
    } catch (error) {
        next(error);
    }
};

// when u get home add this function!!!!

module.exports = { getSeasons, getColors };
