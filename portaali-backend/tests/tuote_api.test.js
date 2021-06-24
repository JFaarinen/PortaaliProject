const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const avustaja = require('./test_helper');
const app = require('../app');
const jestConfig = require('../jest.config');
const api = supertest(app);
const Tuote = require('../models/tuote');
const User = require('../models/user');

describe('kun kannassa on jo tuotteita', () => {
    beforeEach(async () => {
        await Tuote.deleteMany({});
        await Tuote.insertMany(avustaja.testituotteet);
        console.log('...testikanta luotu');
    });

    test('tuotteiden id kenttä on nimetty oikein', async () => {
        const res = await api.get('/api/tuotteet');
        expect(res.body[0].id).toBeDefined();
    });

    test('kaikki tuotteet palautetaan', async () => {
        const res = await api.get('/api/tuotteet');
        expect(res.body).toHaveLength(avustaja.testituotteet.length);
    });

    test('tuotteet palautetaan json -formaatissa', async () => {
        await api
            .get('/api/tuotteet')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('tietty tuote löytyy paluusanoman sisällöstä', async () => {
        const res = await api.get('/api/tuotteet');
        const tuotteet = res.body.map(r => r.content);
        expect(tuotteet).toContain(avustaja.testituotteet[0].name);
    });

    describe('yksittäistä tuotetta tarkasteltaessa', () => {
        test('validilla id:lla etsitty tuote löytyy kannasta', async () => {
            const testituotteet = await avustaja.tuotteetKannassa();
            const haettavaTuote = testituotteet[0];

            const loydettyTuote = await api
                .get(`/api/tuotteet/${haettavaTuote.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);

            const haettavaTuoteJSON = JSON.parse(JSON.stringify(haettavaTuote));
            expect(loydettyTuote.body).toEqual(haettavaTuoteJSON);
        });

        test('epäonnistuu koodilla 404 mikäli tuotetta ei ole', async () => {
            const poistetunTuotteenId = await avustaja.puuttuvaTuote();
            console.log(poistetunTuotteenId);

            await api
                .get(`/api/tuotteet/${poistetunTuotteenId}`)
                .expect(404);
        });

        test('epäonnistuu koodilla 400 jos id epäkelpo', async () => {
            await api
                .get('/api/tuotteet/epäkelpoId')
                .expect(400);
        });
    });


    describe('ja järjestelmään on kirjauduttu ylläpitäjänä', () => {

        beforeEach(async () => {
            await User.deleteMany({});
            const testUser = {
                userName: 'admin',
                etunimi: 'adminuser',
                sukunimi: 'adminen',
            };
            await api
                .post('/api/users')
                .send(testUser);

            const res = await api
                .post('/api/login')
                .send(testUser);

            header = {
                'Authorization': `bearer ${res.body.token}`
            }
        });

        describe('uuden tuotteen lisääminen', () => {
            test('onnistuu kelvollisilla tiedoilla', async () => {
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
                    .set(header)
                    .expect(200)
                    .expect('Content-Type', /application\/json/);

                const tuotteetLopussa = await avustaja.tuotteetKannassa();
                expect(tuotteetLopussa).toHaveLength(avustaja.testituotteet.length + 1);

                const paivitetytTuotteet = tuotteetLopussa.map(t => t.nimi);
                expect(paivitetytTuotteet).toContain('Haarukka');
            });

            test('epäonnistuu puutteellisilla tiedoilla', async () => {
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
        });

        describe('tuotteen poistaminen kannasta', () => {
            test('onnistuu mikäli id on validi', async () => {
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
        });

    });

    describe('ja järjetelmään ei ole kirjauduttu sisään', () => {
        describe('uuden tuotteen lisääminen', () => {
            test('aiheuttaa virheilmoituksen 401 - unauthorized', async () => {
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
                    .expect(401)
                    .expect('Content-Type', /application\/json/);

                const tuotteetLopussa = await avustaja.tuotteetKannassa();
                expect(tuotteetLopussa).toHaveLength(avustaja.testituotteet.length);

                const paivitetytTuotteet = tuotteetLopussa.map(t => t.nimi);
                expect(paivitetytTuotteet).not.toContain('Haarukka');
            });

        });

    });
});


afterAll(() => {
    mongoose.connection.close();
});
