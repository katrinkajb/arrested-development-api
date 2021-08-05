const client = require("./lib/client");
// import our seed data:
const characters = require("./tables/characters");
const { getEmoji } = require("./lib/emojis.js");

run();

async function run() {
    try {
        await client.connect();

        await Promise.all(
            characters.map((character) => {
                return client.query(
                    `
                    INSERT INTO characters (name, full_name, pic, actor)
                    VALUES ($1, $2, $3, $4);
                `,
                    [
                        character.name,
                        character.full_name,
                        character.pic,
                        character.actor,
                    ]
                );
            })
        );

        console.log(
            "seed data load complete",
            getEmoji(),
            getEmoji(),
            getEmoji()
        );
    } catch (err) {
        console.log(err);
    } finally {
        client.end();
    }
}
