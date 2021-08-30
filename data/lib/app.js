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
        console.log(data);

        res.json(data.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// get all quotes
app.get("/quotes", async (req, res) => {
    try {
        const data = await client.query("SELECT * from quotes");
        console.log(data);

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
        console.log(data);

        res.json(data.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.use(require("./middleware/error"));

module.exports = app;
