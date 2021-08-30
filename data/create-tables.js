const client = require("./lib/client");
const { getEmoji } = require("./lib/emojis.js");

run();

async function run() {
    try {
        await client.connect();

        await client.query(`          
            CREATE TABLE characters (
                id SERIAL PRIMARY KEY NOT NULL,
                name VARCHAR(512) NOT NULL,
                full_name VARCHAR(512) NOT NULL,
                aliases VARCHAR(512),
                pic VARCHAR(2000) NOT NULL,
                actor VARCHAR(256) NOT NULL
            );

            CREATE TABLE quotes (
                id SERIAL PRIMARY KEY NOT NULL,
                quote VARCHAR(512) NOT NULL,
                said_by INTEGER NOT NULL REFERENCES characters(id)
            )
        `);

        console.log(
            "create tables complete",
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
