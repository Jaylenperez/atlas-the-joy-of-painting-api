const pool = require('../db'); // assuming your database connection is in db.js
const { status } = require('http-status');
const { CustomError } = require('../middlewares/errorhandler');

// Function for retrieving and parsing subjects
const getSubjects = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT subject FROM subjects');
        
        // Create a Set to store unique subjects
        const subjectSet = new Set();

        // Loop through each row
        result.rows.forEach(row => {
            if (row.subject) { // Skip if subject is null
                // Split the comma-separated string into an array
                const subjectsArr = row.subject.split(',');
                subjectsArr.forEach(s => {
                    // Trim whitespace and add non-empty strings to the Set
                    const trimmedSubject = s.trim();
                    if (trimmedSubject) {
                        subjectSet.add(trimmedSubject);
                    }
                });
            }
        });

        // Convert the Set to an array and sort alphabetically if desired
        const uniqueSubjects = Array.from(subjectSet).sort();

        res.status(status.OK).json({ data: uniqueSubjects });
    } catch (error) {
        next(error);
    }
};

module.exports = { getSubjects };
