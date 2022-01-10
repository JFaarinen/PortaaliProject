//kontrolleri peliesittelyiden lisäämiselle
const larpRouter = require('express').Router();
const Larp = require('../models/larp');

larpRouter.get('/', async (req, res) => {
    const larpit = await Larp.find({});
    res.json(larpit);
});

larpRouter.get('/:id', async (req, res, next) => {
    const larp = await Larp.findById(req.params.id);
    console.log('larp noudettu: ', larp);
    if (larp) {
        res.json(larp.toJSON());
    } else {
        res.status(404).end();
    }
});

module.exports = larpRouter;

