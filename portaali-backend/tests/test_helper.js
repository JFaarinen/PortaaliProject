const Tuote = require('../models/tuote');
const User = require('../models/user');

const testituotteet = [
    {
        nimi: "Lääkärintakki",
        kategoriat: [
            "Vaatetus",
            "Labra",
            "Lääkintä"
        ],
        hinta: 6.50,
        lkm: 8,
        kuvaus: "Lääkärintakkeja, eri kokoja.",
        img: "./images/item-10.jpg"
    },
    {
        nimi: "Kaasunaamari",
        kategoriat: [
            "Post-apo",
            "Suojavaruste"
        ],
        lkm: 21,
        hinta: 5.00,
        kuvaus: "Nasseja. Kumia. Ei suojaa kaasulta oikeasti.",
        img: "./images/item-9.jpg"
    },
];

const puuttuvaTuote = async () => {
    const puuttuva = new Tuote({ nimi: 'tuote poistunut valikoimasta' });
    await puuttuva.save();
    await puuttuva.remove();
    return puuttuva._id.toString();
}

const tuotteetKannassa = async () => {
    const tuotteet = await Tuote.find({});
    return tuotteet.map(tuote => tuote.toJSON());
}

const useritKannassa = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
}

module.exports = {
    testituotteet,
    puuttuvaTuote,
    tuotteetKannassa,
    useritKannassa
}