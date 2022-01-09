const config = require('./utils/config');
const express = require('express');
require('express-async-errors');

//Routerit
const tuoteRouter = require('./controllers/tuotteet');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

//Utility
const middlewares = require('./utils/middlewares');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const cors = require('cors');
app.use(morgan('dev'));
app.use(express.json({ limit: "5mb", extended: true }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

logger.info('avataan yhteys: ', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(res => {
        logger.info('yhteys avattu: Portaali DB');
    })
    .catch((error) => {
        logger.info('yhteyden muodostaminen ei onnistu: PortaaliDB: ', error.message);
    });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middlewares.requestLogger);
app.use(middlewares.tokenExtractor);

app.use('/api/tuotteet', tuoteRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

module.exports = app;