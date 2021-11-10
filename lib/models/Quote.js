const pool = require("../utils/pool");

module.exports = class Quote {
    // eslint-disable-next-line
    id;
    quote;
    saidBy;

    constructor(row) {
        this.id = row.id;
        this.quote = row.quote;
        this.saidBy = row.said_by;
    }

    // GET ALL QUOTES
    static async getAll() {
        const { rows } = await pool.query(`
            SELECT 
            quotes.quote, 
            quotes.said_by
            FROM quotes
            INNER JOIN characters 
            ON quotes.said_by = characters.name
        `);

        return rows.map((row) => {
            return new Quote(row);
        });
    }

    // GET RANDOM QUOTE
    static async getRandom(randomNumber) {
        const { rows } = await pool.query(
            `
                SELECT * FROM quotes WHERE id=$1
            `,
            [randomNumber]
        );
        return new Quote(rows[0]);
    }

    // SEARCH QUOTES
    static async searchQuotes(query) {
        const { rows } = await pool.query(
            `
                SELECT *
                FROM quotes
                WHERE LOWER(quote) LIKE LOWER($1)
            `,
            [`%${query}%`]
        );
        return rows.map((row) => {
            return new Quote(row);
        });
    }

    // GET QUOTES BY CHARACTER NAME
    static async getByName(name) {
        const { rows } = await pool.query(
            `
                SELECT * 
                FROM quotes 
                WHERE LOWER(said_by)=LOWER($1)
            `,
            [name]
        );
        return rows.map((row) => {
            return new Quote(row);
        });
    }
};
