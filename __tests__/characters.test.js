const pool = require('../lib/utils/pool.js');
const request = require('supertest');
const { execSync } = require('child_process');

const app = require('../lib/app.js');

describe('character routes', () => {
    beforeAll(() => {
        execSync('npm run setup-db');
    });

    afterAll(() => {
        pool.end();
    });

    it('returns all characters', async () => {
        // const allChar = [
        //     {
        //         id: 1,
        //         name: 'Michael',
        //         fullName: 'Michael Bluth',
        //         aliases: 'Nichael Bluth, Chareth Cutestory',
        //         pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/f/f7/1x01_Pilot_%2809%29.png/revision/latest?cb=20120301043946',
        //         actor: 'Jason Bateman',
        //     },
        // ];

        const data = await request(app)
            .get('/characters')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(data.body).toEqual(expect.arrayContaining([expect.any(Object)]));
    });

    it('returns the character with the id of 1', async () => {
        const data = await request(app)
            .get('/characters/1')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(data.body).toEqual(
            expect.objectContaining({
                id: 1,
            })
        );
    });

    it('returns all characters with a name that contains the search query', async () => {
        const data = await request(app)
            .get('/characters/search/Michael')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(data.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'Michael',
                    fullName: 'Michael Bluth',
                    aliases: 'Nichael Bluth, Chareth Cutestory',
                    pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/f/f7/1x01_Pilot_%2809%29.png/revision/latest?cb=20120301043946',
                    actor: 'Jason Bateman',
                }),
            ])
        );
    });

    it('returns a random character', async () => {
        const data = await request(app)
            .get('/characters/random')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(data.body).toEqual(expect.any(Object));
    });
});
