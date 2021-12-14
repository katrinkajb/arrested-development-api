const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');

const app = require('../lib/app.js');

describe.skip('character routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    afterAll(() => {
        pool.end();
    });

    it.only('returns all characters', async () => {
        const allChar = [
            {
                id: 1,
                name: 'Michael',
                fullName: 'Michael Bluth',
                aliases: 'Nichael Bluth, Chareth Cutestory',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/f/f7/1x01_Pilot_%2809%29.png/revision/latest?cb=20120301043946',
                actor: 'Jason Bateman',
            },
            {
                id: 2,
                name: 'Lindsay',
                fullName: 'Lindsay Bluth Fünke',
                aliases: 'Nellie Sitwell',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/8/8d/Season_1_Character_Promos_-_Lindsay_Bluth_F%C3%BCnke_03.jpeg/revision/latest?cb=20120429230807',
                actor: 'Portia de Rossi',
            },
            {
                id: 3,
                name: 'Gob',
                fullName: "George Oscar 'GOB' Bluth, Jr.",
                aliases: 'G.O.B.',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/0/02/Season_1_Character_Promos_-_G.O.B.jpeg/revision/latest?cb=20120429230530',
                actor: 'Will Arnett',
            },
            {
                id: 4,
                name: 'George Michael',
                fullName: 'George Michael Bluth',
                aliases: 'George Maharis, Mr. Manager',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/c/c3/Season_1_Character_Promos_-_George_Michael_Bluth_02.jpeg/revision/latest?cb=20120429230332',
                actor: 'Michael Cera',
            },
            {
                id: 5,
                name: 'Maeby',
                fullName: 'Maeby Fünke',
                aliases: 'Surely',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/c/c2/Season_1_Character_Promos_-_Maeby_F%C3%BCnke_02.jpeg/revision/latest?cb=20120429230807',
                actor: 'Alia Shawkat',
            },
            {
                id: 6,
                name: 'Buster',
                fullName: "Byron 'Buster' Bluth",
                aliases: 'Baby Buster',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/e/e3/Season_1_Character_Promos_-_Buster_Bluth_02.jpeg/revision/latest?cb=20120429230331',
                actor: 'Tony Hale',
            },
            {
                id: 7,
                name: 'Tobias',
                fullName: 'Dr. Tobias Onyango Fünke',
                aliases: 'Frightened Inmate #2, Mrs. Featherbottom',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/0/0a/Season_1_Character_Promos_-_Tobias_F%C3%BCnke_02.jpeg/revision/latest?cb=20120429230332',
                actor: 'David Cross',
            },
            {
                id: 8,
                name: 'George',
                fullName: 'George Oscar Bluth, Sr.',
                aliases: 'Pop-pop, Prisoner # 1881372911',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/4/40/Season_1_Character_Promos_-_George_Bluth_03.jpeg/revision/latest?cb=20120429230332',
                actor: 'Jeffrey Tambor',
            },
            {
                id: 9,
                name: 'Lucille',
                fullName: 'Lucille Bluth',
                aliases: 'Lucille 1, Gange',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/4/49/Season_1_Character_Promos_-_Lucille_Bluth_02.jpeg/revision/latest?cb=20120429230529',
                actor: 'Jessica Walter',
            },
            {
                id: 10,
                name: 'Lucille Austero',
                fullName: 'Lucille Austero',
                aliases: 'Lucille 2',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/7/76/1x08_My_Mother_the_Car_%2833%29.png/revision/latest/scale-to-width-down/1000?cb=20120214071637',
                actor: 'Liza Minelli',
            },
            {
                id: 11,
                name: 'Barry',
                fullName: 'Barry Zuckerkorn',
                aliases: 'Barry',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/5/5a/4x01_Flight_of_the_Phoenix_%28072%29.png/revision/latest/scale-to-width-down/1000?cb=20130601035017',
                actor: 'Henry Winkler',
            },
            {
                id: 12,
                name: 'Kitty',
                fullName: 'Kitty Sanchez',
                aliases: 'Kitty',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/7/72/1x18_Missing_Kitty_%2818%29.png/revision/latest/scale-to-width-down/1000?cb=20120819205717',
                actor: 'Judy Greer',
            },
            {
                id: 13,
                name: 'Ann',
                fullName: 'Annabelle Paul Veal',
                aliases: 'Her?, Bland, Egg, Plant, Who?, Ann Hog, Plain',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/1/16/2x11_Out_on_a_Limb_%2816%29.png/revision/latest/scale-to-width-down/1000?cb=20130123232423',
                actor: 'Mae Whitman',
            },
            {
                id: 14,
                name: 'Steve Holt',
                fullName: 'Steve Holt',
                aliases: 'Steve',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/b/b4/1x03_Bringing_Up_Buster_%2831%29.png/revision/latest/scale-to-width-down/1000?cb=20120123071546',
                actor: 'Justin Grant Wade',
            },
            {
                id: 15,
                name: 'Oscar',
                fullName: 'Oscar George Bluth',
                aliases: 'Oscar',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/6/69/2x07_Switch_Hitter_%2812%29.png/revision/latest/scale-to-width-down/1000?cb=20121216214633',
                actor: 'Jeffrey Tambor',
            },
            {
                id: 16,
                name: 'Annyong',
                fullName: "Hel-loh 'Annyong' Bluth",
                aliases: 'Annyong',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/c/c0/1x18_Missing_Kitty_%2828%29.png/revision/latest/scale-to-width-down/1000?cb=20120819210411',
                actor: 'Justin Lee',
            },
            {
                id: 17,
                name: 'J. Walter Weatherman',
                fullName: 'J. Walter Weatherman',
                aliases: 'J, The one-armed man',
                pic: 'https://static.wikia.nocookie.net/arresteddevelopment/images/6/66/1x10_Pier_Pressure_%2840%29.png/revision/latest/scale-to-width-down/1000?cb=20120229061140',
                actor: 'Steve Ryan',
            },
        ];

        const data = await request(app)
            .get('/characters')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(data.body).toEqual(allChar);
    });

    it('returns the character with the id of 1', async () => {
        const data = await request(app)
            .get('/characters/1')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(data.body).toEqual(expect.any(Object));
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
