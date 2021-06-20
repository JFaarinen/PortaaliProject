const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const avustaja = require('./test_helper');
const app = require('../app');
const jestConfig = require('../jest.config');
const api = supertest(app);
const User = require('../models/user');


describe('kun tietokannassa on luotuna käyttäjä', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const salasanaHash = await bcrypt.hash('kalasana', 10);
        const user = new User({
            userId: 'admin',
            etunimi: 'adminuser',
            sukunimi: 'adminen',
            salasanaHash
        });
        await user.save();
    });

    test('käyttäjän luonti onnistuu uudella userID:lla', async () => {
        const usersAlussa = await avustaja.useritKannassa();

        const uusiUser = {
            userId: 'hacker',
            etunimi: '1337',
            sukunimi: 'h4xx0rr',
            password: 'palainen'
        }

        await api
            .post('/api/users')
            .send(uusiUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const usersLopuksi = await avustaja.useritKannassa();
        expect(usersLopuksi).toHaveLength(usersAlussa.length + 1);

        const userIDt = usersLopuksi.map(u => u.userId);
        expect(userIDt).toContain(uusiUser.userId);
    });

    test('käyttäjän luonti antaa virhekoodin 400 jos UserId jo käytössä', async () => {
        const usersAlussa = await avustaja.useritKannassa();

        const uusiUser = {
            userId: 'admin',
            etunimi: '1337',
            sukunimi: '5up3r_h4xx0rr',
            password: 'palainen'
        }

        const result = await api
            .post('/api/users')
            .send(uusiUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('expected `userId` to be unique');

        const usersLopussa = await avustaja.useritKannassa();
        expect(usersLopussa).toHaveLength(usersAlussa.length);
    });
});

afterAll(() => {
    mongoose.connection.close();
});

