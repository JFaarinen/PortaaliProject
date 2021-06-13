require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const Tuote = require('./models/tuote');

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method);
    console.log('Path:   ', request.path);
    console.log('Body:   ', request.body);
    console.log('---');
    next();
}

app.use(express.json());
app.use(express.static('build'));
app.use(cors());
app.use(requestLogger);
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('<h1>Larp -tarvikevarasto Portaali');
});

app.get('/api/tuotteet', (req, res) => {
    Tuote.find({})
        .then(tuotteet => { res.json(tuotteet) });
});

app.get('/api/tuotteet/:id', (req, res, next) => {
    const id = req.params.id;
    Tuote.findById(id)
        .then(tuote => {
            if (tuote) {
                res.json(tuote);
            } else {
                res.status(404).end();
            }
        })
        .catch(error => next(error));
});

app.delete('/api/tuotteet/:id', (req, res, next) => {
    const id = req.params.id;
    Tuote.findByIdAndRemove(id)
        .then(result => {
            res.status(204).end();
        })
        .catch(error => next(error));
});

app.post('/api/tuotteet', (req, res) => {
    const body = req.body;

    if (!body.nimi) {
        return res.status(400).json({
            error: 'puutteelliset tiedot'
        });
    }

    const tuote = new Tuote({
        nimi: body.nimi,
        kategoriat: body.kategoriat,
        hinta: body.hinta || 0.00,
        lkm: body.lkm || 1,
        kuvaus: body.kuvaus,
        img: body.img
    });

    tuote.save().then(lisattyTuote => {
        res.json(lisattyTuote)
    });
});

app.put('/api/tuotteet/:id', (req, res, next) => {
    const body = req.body;
    const id = req.params.id;

    const tuote = {
        nimi: body.nimi,
        kategoriat: body.kategoriat,
        hinta: body.hinta,
        lkm: body.lkm,
        kuvaus: body.kuvaus,
        img: body.img
    };

    Tuote.findByIdAndUpdate(id, tuote, { new: true })
        .then(paivitettyTuote => {
            res.json(paivitettyTuote)
        })
        .catch(error => next(error));
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'virheellinen osoite' });
}

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    }
    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});