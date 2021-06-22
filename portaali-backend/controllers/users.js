const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (req, res) => {
    const users = await User.find({});
    res.json(users.map(u => u.toJSON()));
});

userRouter.post('/', async (req, res) => {
    const body = req.body;

    const saltRounds = 10;
    const salasanaHash = await bcrypt.hash(body.salasana, saltRounds);

    const user = new User({
        userName: body.userName,
        etunimi: body.etunimi,
        sukunimi: body.sukunimi,
        salasanaHash
    });

    const lisattyUser = await user.save();
    res.json(lisattyUser);
});

module.exports = userRouter;