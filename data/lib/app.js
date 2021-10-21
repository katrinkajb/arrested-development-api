const express = require("express");
const cors = require("cors");
const client = require("./client.js");
const app = express();
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// GET ALL CHARACTERS
app.get("/characters", async (req, res) => {
    try {
        const data = await client.query("SELECT * FROM characters");

        res.json(data.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// GET CHARACTER BY ID
app.get("/characters/:id", async (req, res) => {
    try {
        const data = await client.query(
            `
        SELECT * 
        FROM characters 
        WHERE id=$1
        `,
            [req.params.id]
        );

        res.json(data.rows[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// SEARCH CHARACTERS BY NAME
app.get("/characters/search=:query", async (req, res) => {
    try {
        const data = await client.query(
            `
        SELECT *
        FROM characters
        WHERE full_name LIKE %query%=$1
        `,
            [req.params.query]
        );

        res.json(data.rows[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// GET ALL QUOTES
app.get("/quotes", async (req, res) => {
    try {
        const data = await client.query(`
            SELECT 
            quote,
            characters.name
            FROM quotes
            INNER JOIN characters 
            ON quotes.said_by = characters.id
        `);

        res.json(data.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// GET ALL QUOTES BY CHARACTER ID
app.get("/quotes/:characterId", async (req, res) => {
    try {
        const data = await client.query(
            `
            SELECT 
            quote,
            characters.name
            FROM quotes
            INNER JOIN characters 
            ON quotes.said_by = characters.id
            WHERE quotes.said_by=$1
        `,
            [req.params.characterId]
        );

        res.json(data.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// get random quote
// Get x number of quotes
// search quotes by query

// CHICKEN DANCE GIFS
app.get("/chicken", async (req, res) => {
    try {
        const data = await client.query(`
            SELECT url FROM chickens
        `);

        res.json(data.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
app.use(require("./middleware/error"));

module.exports = app;
