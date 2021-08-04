require("dotenv").config();

const { execSync } = require("child_process");

const fakeRequest = require("supertest");
const app = require("../data/lib/app");

describe("app routes", () => {
    describe("routes", () => {
        beforeAll(async () => {
            execSync("npm run setup-db");
        }, 10000);

        test("returns all characters", async () => {
            const expectation = [
                {
                    name: "Gob",
                    full_name: "George Oscar Bluth, Jr.",
                    aliases: ["G.O.B."],
                    pic: "https://static.wikia.nocookie.net/arresteddevelopment/images/0/02/Season_1_Character_Promos_-_G.O.B.jpeg/revision/latest?cb=20120429230530",
                    actor: "Will Arnett",
                    // episodes: [],
                },
                {
                    name: "George Michael",
                    full_name: "George Michael Bluth",
                    aliases: ["George Maharis", "Mr. Manager"],
                    picture:
                        "https://static.wikia.nocookie.net/arresteddevelopment/images/c/c3/Season_1_Character_Promos_-_George_Michael_Bluth_02.jpeg/revision/latest?cb=20120429230332",
                    actor: "Michael Cera",
                    // episodes: [],
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
