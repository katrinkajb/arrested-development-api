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

    describe("quotes tests", () => {
        test("returns all quotes", async () => {
            const data = await fakeRequest(app)
                .get("/quotes")
                .expect("Content-Type", /json/)
                .expect(200);
            expect(data.body).toEqual(expect.any(Array));
        });

        test("returns all quotes for one character by character id", async () => {
            const data = await fakeRequest(app)
                .get("/quotes/9")
                .expect("Content-Type", /json/)
                .expect(200);
            expect(data.body).toEqual(expect.any(Array));
        });
    });
});
