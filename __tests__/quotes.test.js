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

    //  {
    //     quote: expect.any(String),
    //     said_by: expect.any(String),
    // },
    it('returns all quotes', async () => {
        const data = await fakeRequest(app)
            .get('/quotes')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(data.body).toEqual(expect.arrayContaining([expect.any(Object)]));
    });

    it('returns all quotes for one character by character name', async () => {
        const data = await fakeRequest(app)
            .get('/quotes/Lucille')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(data.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    saidBy: 'Lucille',
                }),
            ])
        );
    });

    it('returns all quotes by search query', async () => {
        const data = await fakeRequest(app)
            .get('/quotes/search/Banana')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(data.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    quote: 'I mean it’s one banana Michael, what could it cost, $10?',
                    saidBy: 'Lucille',
                }),
            ])
        );
    });

    it('returns a random quote', async () => {
        const data = await fakeRequest(app)
            .get('/quotes/random')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(data.body).toEqual(expect.any(Object));
    });
});
