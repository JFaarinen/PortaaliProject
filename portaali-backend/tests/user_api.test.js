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
});

afterAll(() => {
    mongoose.connection.close();
});

