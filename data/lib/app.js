const characters = require("../tables/characters");
const quotes = require("../tables/quotes");
const chickens = require("../tables/chickens");

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

// GET RANDOM CHARACTER
app.get("/characters/random", async (req, res) => {
    const randomNumber = Math.ceil(Math.random() * (characters.length - 1));
    try {
        const data = await client.query(
            `
            SELECT * FROM characters WHERE id=$1
        `,
            [randomNumber]
        );

        res.json(data.rows[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// SEARCH CHARACTERS BY NAME
app.get("/characters/search/:query", async (req, res) => {
    try {
        const data = await client.query(
            `
        SELECT *
        FROM characters
        WHERE LOWER(full_name) LIKE LOWER($1)
        `,
            [`%${req.params.query}%`]
        );

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

// GET RANDOM QUOTE
app.get("/quotes/random", async (req, res) => {
    const randomNumber = Math.ceil(Math.random() * (quotes.length - 1));
    try {
        const data = await client.query(
            `
            SELECT * FROM quotes WHERE id=$1
        `,
            [randomNumber]
        );

        res.json(data.rows[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// SEARCH QUOTES
app.get("/quotes/search/:query", async (req, res) => {
    try {
        const data = await client.query(
            `
        SELECT *
        FROM quotes
        WHERE LOWER(quote) LIKE LOWER($1)
        `,
            [`%${req.params.query}%`]
        );

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

// GET ALL CHICKEN DANCE GIFS
app.get("/chicken", async (req, res) => {
    try {
        const data = await client.query(`
            SELECT * FROM chickens
        `);

        res.json(data.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// GET A RANDOM CHICKEN DANCE GIF
app.get("/chicken/random", async (req, res) => {
    const randomNumber = Math.ceil(Math.random() * (chickens.length - 1));
    try {
        const data = await client.query(
            `
            SELECT * FROM chickens WHERE id=$1
        `,
            [randomNumber]
        );

        res.json(data.rows[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.use(require("./middleware/error"));

module.exports = app;
