const fs = require("fs").promises;
const { seedTables } = require("./load-seed-data.js");

module.exports = (pool) => {
    return fs
        .readFile(`${__dirname}/../sql/setup.sql`, { encoding: "utf-8" })
        .then((sql) => pool.query(sql))
        .then(() => {
            seedTables();
        });
};
