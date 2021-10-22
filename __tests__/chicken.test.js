require("dotenv").config();
const { execSync } = require("child_process");
const fakeRequest = require("supertest");
const app = require("../data/lib/app");
const client = require("../data/lib/client");

describe("app routes", () => {
    beforeAll(async () => {
        execSync("npm run setup-db");

        await client.connect();
    }, 20000);

    afterAll((done) => {
        return client.end(done);
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
