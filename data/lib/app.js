const express = require("express");
const cors = require("cors");
const client = require("./client.js");
const app = express();
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// get all characters
app.get("/characters", async (req, res) => {
    try {
        const data = await client.query("SELECT * from characters");

        res.json(data.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// get character by id
app.get("/characters/:id", async (req, res) => {
    try {
        const data = await client.query(
            `
        SELECT * from characters 
        WHERE id=$1
        `,
            [req.params.id]
        );

        res.json(data.rows[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// get all quotes
app.get("/quotes", async (req, res) => {
    try {
        const data = await client.query("SELECT * from quotes");

        res.json(data.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// get quotes by character id
app.get("/quotes/:characterId", async (req, res) => {
    try {
        const data = await client.query(
            `
        SELECT * from quotes 
        WHERE said_by=$1
        `,
            [req.params.characterId]
        );

        res.json(data.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.use(require("./middleware/error"));

module.exports = app;
