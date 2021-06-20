const mongoose = require('mongoose');
const supertest = require('supertest');
const avustaja = require('./test_helper');
const app = require('../app');
const jestConfig = require('../jest.config');
const api = supertest(app);
const Tuote = require('../models/tuote');


beforeEach(async () => {
    await Tuote.deleteMany({});
    let testiTuote = new Tuote(avustaja.testituotteet[0]);
    await testiTuote.save();
    testiTuote = new Tuote(avustaja.testituotteet[1]);
    await testiTuote.save();
});

test('tuotteet palautetaan json -formaatissa', async () => {
    await api
        .get('/api/tuotteet')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('Kannassa on kaksi tuotetta', async () => {
    const res = await api.get('/api/tuotteet');
    expect(res.body).toHaveLength(avustaja.testituotteet.length);
});

test('kannassa oleva tuote palautetaan get -pyynnölle', async () => {
    const res = await api.get('/api/tuotteet');
    const tuotteet = res.body.map(r => r.content);

    expect(tuotteet).toContain(avustaja.testituotteet[0].name);
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

    const tuotteetLopussa = await avustaja.tuotteetKannassa();
    expect(tuotteetLopussa).toHaveLength(avustaja.testituotteet.length + 1);

    const paivitetytTuotteet = tuotteetLopussa.map(t => t.nimi);
    expect(paivitetytTuotteet).toContain('Haarukka');
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

        const tuotteetLopussa = await avustaja.tuotteetKannassa();
        expect(tuotteetLopussa).toHaveLength(avustaja.testituotteet.length);
    }, 8000);
});

test('yksittäinen tuote löytyy kannasta', async () => {
    const testituotteet = await avustaja.tuotteetKannassa();
    const haettavaTuote = testituotteet[0];

    const loydettyTuote = await api
        .get(`/api/tuotteet/${haettavaTuote.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    const haettavaTuoteJSON = JSON.parse(JSON.stringify(haettavaTuote));
    expect(loydettyTuote.body).toEqual(haettavaTuoteJSON);
});

test('tuote pystytään poistamaan kannasta', async () => {
    const tuotteetAlussa = await avustaja.tuotteetKannassa();
    const poistettavaTuote = tuotteetAlussa[0];

    await api
        .delete(`/api/tuotteet/${poistettavaTuote.id}`)
        .expect(204);

    const tuotteetLopuksi = await avustaja.tuotteetKannassa();
    expect(tuotteetLopuksi).toHaveLength(avustaja.testituotteet.length - 1);

    const tuotteet = tuotteetLopuksi.map(t => t.nimi);
    expect(tuotteet).not.toContain(poistettavaTuote.nimi);
});

afterAll(() => {
    mongoose.connection.close();
});