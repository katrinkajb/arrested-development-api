const pool = require('../lib/utils/pool.js');
const characters = require('./seed-data/characters.js');
const quotes = require('./seed-data/quotes.js');
const chickens = require('./seed-data/chickens.js');

const seedTables = async () => {
  try {
    await Promise.all(
      characters.map((character) => {
        return pool.query(
          `
            INSERT INTO characters (name, full_name, aliases, pic, actor)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`,
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
        return pool.query(
          `
                INSERT INTO quotes (quote, said_by)
                VALUES ($1, $2)
                RETURNING *;
                `,
          [quote.quote, quote.said_by]
        );
      })
    );

    await Promise.all(
      chickens.map((chicken) => {
        return pool.query(
          `
                INSERT INTO chickens (url)
                VALUES ($1)
                RETURNING *;
                `,
          [chicken.url]
        );
      })
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

seedTables();

module.exports = {
  seedTables,
};
