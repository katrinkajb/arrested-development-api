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
            ];

            const data = await fakeRequest(app)
                .get("characters/search=michael")
                .expect("Content-Type", /json/)
                .expect(200);
            expect(data.body).toEqual(expectation);
        });
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
