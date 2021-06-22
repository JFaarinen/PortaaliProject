const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ userName: body.userName });
    const salasanaOikein = user === null
        ? false
        : await bcrypt.compare(body.salasana, user.salasanaHash);

    if (!(user && salasanaOikein)) {
        return res.status(401).json({
            error: 'Virheellinen käyttäjätunnus tai salasana'
        });
    }

    const userForToken = {
        userName: user.userName,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.TOKEN_KEY);

    res
        .status(200)
        .send({ token, userName: user.userName, etunimi: user.etunimi, sukunimi: user.sukunimi });
});

module.exports = loginRouter;
