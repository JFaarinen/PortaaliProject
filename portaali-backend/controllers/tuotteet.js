const jwt = require('jsonwebtoken');
const tuoteRouter = require('express').Router();
const Tuote = require('../models/tuote');

tuoteRouter.get('/', async (req, res) => {
    const tuotteet = await Tuote.find({});
    res.json(tuotteet);
});

tuoteRouter.get('/:id', async (req, res, next) => {
    const tuote = await Tuote.findById(req.params.id);
    if (tuote) {
        res.json(tuote.toJSON());
    } else {
        res.status(404).end();
    }
});

tuoteRouter.delete('/:id', async (req, res, next) => {
    await Tuote.findByIdAndRemove(req.params.id);
    res.status(204).end();
});

tuoteRouter.post('/', async (req, res, next) => {
    const body = req.body;

    const avattuToken = jwt.verify(req.token, process.env.TOKEN_KEY);
    if (!req.token || !avattuToken.id) {
        return res.status(401).json({ error: 'token puuttuu tai viallinen' });
    }

    const tuote = new Tuote({
        nimi: body.nimi,
        kategoriat: body.kategoriat,
        hinta: body.hinta || 0.00,
        lkm: body.lkm || 1,
        kuvaus: body.kuvaus,
        img: body.img
    });

    const lisattyTuote = await tuote.save();
    res.json(lisattyTuote.toJSON());
});

tuoteRouter.put('/:id', async (req, res, next) => {
    const body = req.body;
    const id = req.params.id;

    const avattuToken = jwt.verify(req.token, process.env.TOKEN_KEY);
    if (!req.abortedtoken || !avattuToken.id) {
        return res.status(401).json({ error: 'token puuttuu tai viallinen' });
    }

    const tuote = {
        nimi: body.nimi,
        kategoriat: body.kategoriat,
        hinta: body.hinta,
        lkm: body.lkm,
        kuvaus: body.kuvaus,
        img: body.img
    };

    const paivitettyTuote = await Tuote.findByIdAndUpdate(id, tuote, { new: true });
    res.json(paivitettyTuote);
});

module.exports = tuoteRouter;

