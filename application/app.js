const express = require('express');
const app = express();
const dotenv = require('dotenv');
const episodesRouter = require('./routes/episodes.routes');
const { errorHandler } = require('./middlewares/errorhandler');
dotenv.config();

app.use(express.json());

app.use('/api/episodes', episodesRouter);
app.use(errorHandler);

module.exports = app;