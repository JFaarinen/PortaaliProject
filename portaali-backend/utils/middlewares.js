const logger = require('../utils/logger');

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method);
    logger.info('Path:   ', request.path);
    logger.info('Body:   ', request.body);
    logger.info('---');
    next();
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'virheellinen osoite' });
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'virheellinen token' });
    } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'token vanhentunut' });
    }

    logger.error(error.message);
    next(error);
}

/*
* tokenExtractor poimii requestin headerissa olevan
* authorization -tokenin.
*/
const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7);
    }
    next();
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}