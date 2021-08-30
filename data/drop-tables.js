const client = require("./lib/client");
const { getEmoji } = require("./lib/emojis.js");

run();

async function run() {
    try {
        await client.connect();

        await client.query(`
            DROP TABLE IF EXISTS characters;
            DROP TABLE IF EXISTS quotes;
        `);

        console.log(
            " drop tables complete",
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
