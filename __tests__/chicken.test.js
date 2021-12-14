require('dotenv').config();
const fakeRequest = require('supertest');
const app = require('../lib/app');
const setup = require('../data/setup');
const pool = require('../lib/utils/pool');

describe('app routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    afterAll((done) => {
        return pool.end(done);
    });
    describe.skip('Chicken dance tests', () => {
        test('returns all chicken dance gifs', async () => {
            const chickens = [
                {
                    url: 'https://tv-fanatic-res.cloudinary.com/iu/s--Dx2MU33g--/t_full/cs_srgb,f_auto,fl_strip_profile.lossy,q_auto:420/v1407322355/arrested-development-dancing-gif.gif',
                },
                {
                    url: 'https://c.tenor.com/Ggx4JAo3QaIAAAAC/arrested-development-chicken.gif',
                },
                {
                    url: 'https://64.media.tumblr.com/tumblr_lj6zc4WwBL1qzwuo3.gif',
                },
                {
                    url: 'https://media.tumblr.com/tumblr_lj6zd2mwbo1qzwuo3.gif',
                },
                {
                    url: 'https://24.media.tumblr.com/tumblr_m2sts9O1BI1r7vuvuo2_250.gif',
                },
                {
                    url: 'https://24.media.tumblr.com/tumblr_m2sts9O1BI1r7vuvuo3_250.gif',
                },
                {
                    url: 'https://25.media.tumblr.com/tumblr_m2sts9O1BI1r7vuvuo4_250.gif',
                },
                {
                    url: 'https://25.media.tumblr.com/tumblr_m2sts9O1BI1r7vuvuo1_250.gif',
                },
            ];
            const data = await fakeRequest(app)
                .get('/chicken')
                .expect('Content-Type', /json/)
                .expect(200);
            expect(data.body).toEqual(chickens);
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
