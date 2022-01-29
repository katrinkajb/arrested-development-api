require('dotenv').config();
const fakeRequest = require('supertest');
const app = require('../lib/app');
const { execSync } = require('child_process');
const pool = require('../lib/utils/pool');

describe('app routes', () => {
    beforeAll(() => {
        execSync('npm run setup-db');
    });

    afterAll((done) => {
        return pool.end(done);
    });

    // {url: expect.any(String)}
    describe('Chicken dance tests', () => {
        test('returns all chicken dance gifs', async () => {
            const data = await fakeRequest(app)
                .get('/chicken')
                .expect('Content-Type', /json/)
                .expect(200);
            expect(data.body).toEqual(
                expect.arrayContaining([expect.any(Object)])
            );
        });

        test('returns a random chicken dance gif', async () => {
            const data = await fakeRequest(app)
                .get('/chicken/random')
                .expect('Content-Type', /json/)
                .expect(200);
            expect(data.body).toEqual(expect.any(Object));
        });
    });
});
