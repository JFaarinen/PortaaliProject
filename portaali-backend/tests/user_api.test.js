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
            userName: 'admin',
            etunimi: 'adminuser',
            sukunimi: 'adminen',
            salasanaHash
        });
        await user.save();
    });

    test('käyttäjän luonti onnistuu uudella usernamella', async () => {
        const usersAlussa = await avustaja.useritKannassa();

        const uusiUser = {
            userName: 'hacker',
            etunimi: '1337',
            sukunimi: 'h4xx0rr',
            salasana: 'palainen'
        }

        await api
            .post('/api/users')
            .send(uusiUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const usersLopuksi = await avustaja.useritKannassa();
        expect(usersLopuksi).toHaveLength(usersAlussa.length + 1);

        const usernamet = usersLopuksi.map(u => u.userName);
        expect(usernamet).toContain(uusiUser.userName);
    });

    test('käyttäjän luonti antaa virhekoodin 400 jos UseName jo käytössä', async () => {
        const usersAlussa = await avustaja.useritKannassa();

        const uusiUser = {
            userName: 'admin',
            etunimi: '1337',
            sukunimi: '5up3r_h4xx0rr',
            salasana: 'palainen'
        }

        const result = await api
            .post('/api/users')
            .send(uusiUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('expected `userName` to be unique');

        const usersLopussa = await avustaja.useritKannassa();
        expect(usersLopussa).toHaveLength(usersAlussa.length);
    });
});

afterAll(() => {
    mongoose.connection.close();
});

