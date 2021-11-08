require("dotenv").config();
const fakeRequest = require("supertest");
const app = require("../lib/app");
const setup = require("../data/setup");
const pool = require("../lib/utils/pool");

describe("app routes", () => {
    beforeEach(() => {
        return setup(pool);
    });

    afterAll((done) => {
        return pool.end(done);
    });
    describe("Chicken dance tests", () => {
        test("returns all chicken dance gifs", async () => {
            const data = await fakeRequest(app)
                .get("/chicken")
                .expect("Content-Type", /json/)
                .expect(200);
            expect(data.body).toEqual(expect.any(Array));
        });

        test("returns a random chicken dance gif", async () => {
            const data = await fakeRequest(app)
                .get("/chicken/random")
                .expect("Content-Type", /json/)
                .expect(200);
            expect(data.body).toEqual(expect.any(Object));
        });
    });
});
