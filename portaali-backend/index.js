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

let tuotteet = [
    {
        id: 1,
        nimi: "Haarukka",
        kategoriat: [
            "Astiat",
            "Ruoanlaitto",
            "Aterimet"
        ],
        hinta: 1.50,
        lkm: 13,
        kuvaus: "Siinä on piikkejä varren päässä mutta heinähankoa pienempi...",
        img: "./images/item-1.jpg"
    },
    {
        id: 2,
        nimi: "Kuppi, savea",
        kategoriat: [
            "Astiat",
            "Ruoanlaitto",
            "Kupit"
        ],
        hinta: 2.00,
        lkm: 20,
        kuvaus: "Savikuppeja, eri näköisiä",
        img: "./images/item-2.jpg"
    },
    {
        id: 3,
        nimi: "Styroksilaatikko, iso",
        kategoriat: [
            "Labra",
            "Lääkintä",
            "Säilytys"
        ],
        hinta: 1.50,
        lkm: 2,
        kuvaus: "Laatikko. Siihen menee sisälle tavaraa. Tai kissa",
        img: "./images/item-3.jpg"
    },
    {
        id: 4,
        nimi: "Dekantterilasi",
        kategoriat: [
            "Labra",
            "Lääkintä"
        ],
        hinta: 3.00,
        lkm: 7,
        kuvaus: "Dekantterilasi, eri kokoja. Myöhemmin päivitellään ehkä valintoja per koko",
        img: "./images/item-4.jpg"
    },
    {
        id: 5,
        nimi: "Röntgenkuva, aivot",
        kategoriat: [
            "Labra",
            "Lääkintä",
            "Kauhu"
        ],
        hinta: 12.00,
        lkm: 1,
        kuvaus: "Igor kaivoi tän jostain. A.B Normal",
        img: "./images/item-5.jpg"
    },
    {
        id: 6,
        nimi: "Diskovalo, pöytämalli",
        kategoriat: [
            "Valaistus",
            "Tehosteet"
        ],
        hinta: 10.00,
        lkm: 1,
        kuvaus: "Partypallo suoraan 70 -luvulta",
        img: "./images/item-6.jpg"
    },
    {
        id: 7,
        nimi: "Pissauspullo",
        kategoriat: [
            "Labra",
            "Lääkintä",
            "Squik!"
        ],
        hinta: 0.50,
        lkm: 1,
        kuvaus: "Pullo pissalle. Sisällön saa tuottaa itse. Palautettava pestynä",
        img: "./images/item-7.jpg"
    },
    {
        id: 8,
        nimi: "Lyhty",
        kategoriat: [
            "Valaistus",
            "Fantasia",
            "Keskiaika"
        ],
        hinta: 6.00,
        lkm: 8,
        kuvaus: "Lyhty. Pannaan tuli sisään, tulee valoa ulos",
        img: "./images/item-8.jpg"
    },
    {
        id: 9,
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
    {
        id: 10,
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
    }
];

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

app.get('/api/tuotteet/:id', (req, res) => {
    const id = Number(req.params.id);
    const tuote = tuotteet.find(t => t.id === id);

    if (tuote) {
        res.json(tuote);
    } else {
        res.status(404).end();
    }
});

app.delete('/api/tuotteet/:id', (req, res) => {
    const id = Number(req.params.id);
    tuotteet = tuotteet.filter(t => t.id !== id);
    res.status(204).end();
});

app.post('/api/tuotteet', (req, res) => {
    const maxId = tuotteet.length > 0
        ? Math.max(...tuotteet.map(t => t.id)) : 0;

    const body = req.body;

    if (!body.nimi) {
        return res.status(400).json({
            error: 'puutteelliset tiedot'
        });
    }

    const tuote = {
        nimi: body.nimi,
        kategoriat: body.kategoriat,
        hinta: body.hinta || 0.00,
        lkm: body.lkm || 1,
        kuvaus: body.kuvaus,
        img: body.img,
        id: maxId + 1
    }

    tuotteet = tuotteet.concat(tuote);
    res.json(tuote);
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'virheellinen osoite' });
}

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});