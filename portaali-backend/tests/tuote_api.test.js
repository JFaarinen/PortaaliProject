const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const jestConfig = require('../jest.config');
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
    const res = await api.get('/api/tuotteet');
    expect(res.body).toHaveLength(testituotteet.length);
});

test('kannassa oleva tuote palautetaan get -pyynnölle', async () => {
    const res = await api.get('/api/tuotteet');
    const tuotteet = res.body.map(r => r.content);

    expect(tuotteet).toContain(testituotteet[0].name);
});

test('kelvollinen tuote voidaan lisätä portaaliin', async () => {
    const uusiTuote = {
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
    };

    await api
        .post('/api/tuotteet')
        .send(uusiTuote)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    const res = await api.get('/api/tuotteet');
    const tuotteet = res.body.map(r => r.nimi);

    expect(res.body).toHaveLength(testituotteet.length + 1);
    expect(tuotteet).toContain('Haarukka');
});

test('nimetöntä tuotetta ei lisätä', async () => {
    jest.setTimeout(async () => {
        const uusiTuote = {
            kategoriat: [
                "Astiat",
                "Ruoanlaitto",
                "Aterimet"
            ],
            hinta: 1.50,
            lkm: 13,
            kuvaus: "Siinä on piikkejä varren päässä mutta heinähankoa pienempi...",
            img: "./images/item-1.jpg"
        };

        await api
            .post('api/tuotteet')
            .send(uusiTuote)
            .expect(400);

        const res = await api.get('/api/tuotteet');
        expect(res.body).toHaveLength(testituotteet.length);
    }, 8000);
});

test('haluttu tuote pystytään noutamaan', async () => {
    const testituotteet = await Tuote.find({});
    const haluttuTuote = testituotteet[0];

    const noudettuTuote = await api
        .get(`/api/tuotteet/${haluttuTuote._id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    const haluttuTuoteJSON = JSON.parse(JSON.stringify(haluttuTuote));
    expect(noudettuTuote.body).toEqual(haluttuTuoteJSON);
});

afterAll(() => {
    mongoose.connection.close();
});