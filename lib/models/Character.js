const pool = require('../utils/pool');

module.exports = class Character {
    id;
    name;
    fullName;
    aliases;
    pic;
    actor;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.fullName = row.full_name;
        this.aliases = row.aliases;
        this.pic = row.pic;
        this.actor = row.actor;
    }

    // GET ALL CHARACTERS
    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM characters ORDER BY id'
        );
        return rows.map((row) => {
            return new Character(row);
        });
    }

    // GET RANDOM CHARACTER
    static async getRandom(randomNumber) {
        const { rows } = await pool.query(
            `
                SELECT * FROM characters WHERE id=$1
            `,
            [randomNumber]
        );
        return new Character(rows[0]);
    }

    // SEARCH CHARACTERS BY NAME
    static async searchCharacters(query) {
        const { rows } = await pool.query(
            `
                SELECT *
                FROM characters
                WHERE LOWER(full_name) LIKE LOWER($1)
            `,
            [`%${query}%`]
        );
        return rows.map((row) => {
            return new Character(row);
        });
    }

    // GET CHARACTER BY ID
    static async getById(id) {
        const { rows } = await pool.query(
            `
                SELECT * 
                FROM characters 
                WHERE id=$1
            `,
            [id]
        );
        return new Character(rows[0]);
    }
};
