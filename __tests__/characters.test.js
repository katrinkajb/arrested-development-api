require("dotenv").config();
const fakeRequest = require("supertest");
const app = require("../data/lib/app");
const client = require("../data/lib/client");
const setup = require("../data/setup");
const pool = require("../lib/utils/pool");

describe("app routes", () => {
    beforeEach(() => {
        return setup(pool);
    });

    afterAll((done) => {
        return client.end(done);
    });
    describe("character tests", () => {
        test("returns all characters", async () => {
            const data = await fakeRequest(app)
                .get("/characters")
                .expect("Content-Type", /json/)
                .expect(200);
            expect(data.body).toEqual(expect.any(Array));
        });

        test("returns the character with the id of 1", async () => {
            const expectation = {
                id: 1,
                name: "Michael",
                full_name: "Michael Bluth",
                aliases: "Nichael Bluth, Chareth Cutestory",
                pic: "https://static.wikia.nocookie.net/arresteddevelopment/images/f/f7/1x01_Pilot_%2809%29.png/revision/latest?cb=20120301043946",
                actor: "Jason Bateman",
            };

            const data = await fakeRequest(app)
                .get("/characters/1")
                .expect("Content-Type", /json/)
                .expect(200);
            expect(data.body).toEqual(expectation);
        });

        test("returns all characters with a name that contains the search query", async () => {
            const expectation = [
                {
                    id: 1,
                    name: "Michael",
                    full_name: "Michael Bluth",
                    aliases: "Nichael Bluth, Chareth Cutestory",
                    pic: "https://static.wikia.nocookie.net/arresteddevelopment/images/f/f7/1x01_Pilot_%2809%29.png/revision/latest?cb=20120301043946",
                    actor: "Jason Bateman",
                },
                {
                    id: 4,
                    name: "George Michael",
                    full_name: "George Michael Bluth",
                    aliases: "George Maharis, Mr. Manager",
                    pic: "https://static.wikia.nocookie.net/arresteddevelopment/images/c/c3/Season_1_Character_Promos_-_George_Michael_Bluth_02.jpeg/revision/latest?cb=20120429230332",
                    actor: "Michael Cera",
                },
            ];

            const data = await fakeRequest(app)
                .get("/characters/search/Michael")
                .expect("Content-Type", /json/)
                .expect(200);
            expect(data.body).toEqual(expectation);
        });

        test("returns a random character", async () => {
            const data = await fakeRequest(app)
                .get("/characters/random")
                .expect("Content-Type", /json/)
                .expect(200);
            expect(data.body).toEqual(expect.any(Object));
        });
    });
});
