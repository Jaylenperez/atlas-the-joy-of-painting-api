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

const getColors = async (req, res, next) => {
    try {
        // Query the colors column from the table
        const result = await pool.query('SELECT colors FROM colors');
        const colorSet = new Set();

        // Process each row from the result
        result.rows.forEach(row => {
            // Split the comma-separated string into an array and trim any extra spaces
            const colorsArray = row.colors.split(',').map(color => color.trim());
            // Add each color to the set, which ensures uniqueness
            colorsArray.forEach(color => {
                if (color) { // Only add non-empty values
                    colorSet.add(color);
                }
            });
        });

        // Convert the set to an array and sort it (optional)
        const uniqueColors = Array.from(colorSet).sort();
        res.status(status.OK).json({ data: uniqueColors });
    } catch (error) {
        next(error);
    }
};

module.exports = { getSeasons, getColors };
