const tuoteRouter = require('express').Router();
const Tuote = require('../models/tuote');

tuoteRouter.get('/', async (req, res) => {
    const tuotteet = await Tuote.find({});
    res.json(tuotteet);
});

tuoteRouter.get('/:id', async (req, res, next) => {
    try {
        const tuote = await Tuote.findById(req.params.id);
        if (tuote) {
            res.json(tuote.toJSON());
        } else {
            res.status(404).end();
        }
    } catch (exception) {
        next(exception)
    };
});

tuoteRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Tuote.findByIdAndRemove(id)
        .then(result => {
            res.status(204).end();
        })
        .catch(error => next(error));
});

tuoteRouter.post('/', (req, res) => {
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

tuoteRouter.put('/:id', (req, res, next) => {
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

module.exports = tuoteRouter;

