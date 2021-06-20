const Tuote = require('../models/tuote');

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

const tuotteetKannassa = async () => {
    const tuotteet = await Tuote.find({});
    return tuotteet.map(tuote => tuote.toJSON());
}

module.exports = {
    testituotteet,
    tuotteetKannassa
}