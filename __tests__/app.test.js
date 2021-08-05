require("dotenv").config();

const { execSync } = require("child_process");

const fakeRequest = require("supertest");
const app = require("../data/lib/app");
const client = require("../data/lib/client");

describe("app routes", () => {
    describe("routes", () => {
        beforeAll(async () => {
            execSync("npm run setup-db");

            await client.connect();
        }, 10000);

        afterAll((done) => {
            return client.end(done);
        });

        test("returns all characters", async () => {
            const expectation = [
                {
                    name: "Michael",
                    full_name: "Michael Bluth",
                    pic: "https://static.wikia.nocookie.net/arresteddevelopment/images/f/f7/1x01_Pilot_%2809%29.png/revision/latest?cb=20120301043946",
                    actor: "Jason Bateman",
                },
                {
                    name: "Lindsay",
                    full_name: "Lindsay Bluth Fünke",
                    pic: "https://static.wikia.nocookie.net/arresteddevelopment/images/8/8d/Season_1_Character_Promos_-_Lindsay_Bluth_F%C3%BCnke_03.jpeg/revision/latest?cb=20120429230807",
                    actor: "Portia de Rossi",
                },
                {
                    name: "Gob",
                    full_name: "George Oscar Bluth, Jr.",
                    pic: "https://static.wikia.nocookie.net/arresteddevelopment/images/0/02/Season_1_Character_Promos_-_G.O.B.jpeg/revision/latest?cb=20120429230530",
                    actor: "Will Arnett",
                },
            ];

            const data = await fakeRequest(app)
                .get("/characters")
                .expect("Content-Type", /json/)
                .expect(200);

            expect(data.body).toEqual(expectation);
        });
    });
});
