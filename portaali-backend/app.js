const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const tuoteRouter = require('./controllers/tuotteet');
const userRouter = require('./controllers/users');
const middlewares = require('./utils/middlewares');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const morgan = require('morgan');
app.use(morgan('dev'));

logger.info('connecting to ', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(res => {
        logger.info('connected to Portaali DB');
    })
    .catch((error) => {
        logger.info('error connecting to PortaaliDB: ', error.message);
    });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middlewares.requestLogger);
app.use('/api/tuotteet', tuoteRouter);
app.use('/api/users', userRouter);
app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

module.exports = app;