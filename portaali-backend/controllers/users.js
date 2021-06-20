const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.post('/', async (req, res) => {
    const body = req.body;

    const saltRounds = 10;
    const salasanaHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        userId: body.userId,
        etunimi: body.etunimi,
        sukunimi: body.sukunimi,
        salasanaHash
    });

    const lisattyUser = await user.save();
    res.json(lisattyUser);
});

module.exports = userRouter;