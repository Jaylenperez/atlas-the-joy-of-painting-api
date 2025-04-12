const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const episodesRouter = require('./routes/episodes.routes');
const colorsRouter = require('./routes/colors.routes');
const { errorHandler } = require('./middlewares/errorhandler');
dotenv.config();

app.use(express.json());

app.use(express.static('public'));

app.use('/api/episodes', episodesRouter);

app.use('/api/colors', colorsRouter);
app.use(errorHandler);

module.exports = app;