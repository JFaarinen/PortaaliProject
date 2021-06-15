const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
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

beforeEach(async () => {
    await Tuote.deleteMany({});
    let testiTuote = new Tuote(testituotteet[0]);
    await testiTuote.save();
    testiTuote = new Tuote(testituotteet[1]);
    await testiTuote.save();
});

test('tuotteet palautetaan json -formaatissa', async () => {
    await api
        .get('/api/tuotteet')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('testikannassa on kaksi tuotetta', async () => {
    const response = await api.get('/api/tuotteet');
    expect(response.body).toHaveLength(testituotteet.length);
});

test('kannassa oleva tuote palautetaan get -pyynnölle', async () => {
    const response = await api.get('/api/tuotteet');
    const tuotteet = response.body.map(r => r.content);

    expect(tuotteet).toContain(testituotteet[0].name);
});

afterAll(() => {
    mongoose.connection.close();
});