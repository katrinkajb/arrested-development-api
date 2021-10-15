const client = require("./lib/client");
const characters = require("./tables/characters");
const quotes = require("./tables/quotes");
const chickens = require("./tables/chickens");
const { getEmoji } = require("./lib/emojis.js");

run();

async function run() {
    try {
        await client.connect();

        await Promise.all(
            characters.map((character) => {
                return client.query(
                    `
                    INSERT INTO characters (name, full_name, aliases, pic, actor)
                    VALUES ($1, $2, $3, $4, $5);
                    `,
                    [
                        character.name,
                        character.full_name,
                        character.aliases,
                        character.pic,
                        character.actor,
                    ]
                );
            })
        );

        await Promise.all(
            quotes.map((quote) => {
                return client.query(
                    `
                    INSERT INTO quotes (quote, said_by)
                    VALUES ($1, $2);
                    `,
                    [quote.quote, quote.said_by]
                );
            })
        );

        await Promise.all(
            chickens.map((chicken) => {
                return client.query(
                    `
                    INSERT INTO chickens (url)
                    VALUES ($1);
                    `,
                    [chicken.url]
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
