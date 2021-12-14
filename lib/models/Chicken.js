const pool = require('../utils/pool');

module.exports = class Chicken {
    // id;
    url;

    constructor(row) {
        // this.id = row.id;
        this.url = row.url;
    }

    // GET ALL CHICKEN DANCE GIFS
    static async getAll() {
        const { rows } = await pool.query(`SELECT * from chickens`);
        return rows.map((row) => {
            return new Chicken(row);
        });
    }

    // GET RANDOM CHICKEN DANCE GIF
    static async getRandom(randomNumber) {
        const { rows } = await pool.query(
            `
                SELECT * FROM chickens WHERE id=$1
            `,
            [randomNumber]
        );
        return new Chicken(rows[0]);
    }
};
