const { Router } = require("express");
const quotes = require("../../data/seed-data/quotes.js");
const Quote = require("../models/Quote.js");

module.exports = Router()
    // GET ALL QUOTES
    .get("/", async (req, res, next) => {
        try {
            const quotes = await Quote.getAll();
            res.send(quotes);
        } catch (error) {
            next(error);
        }
    })

    // GET RANDOM QUOTE
    .get("/random", async (req, res, next) => {
        const randomNumber = Math.ceil(Math.random() * (quotes.length - 1));
        try {
            const quote = await Quote.getRandom(randomNumber);
            res.send(quote);
        } catch (error) {
            next(error);
        }
    })

    // SEARCH QUOTES
    .get("/search/:query", async (req, res, next) => {
        try {
            const quotes = await Quote.searchQuotes(req.params.query);

            res.send(quotes);
        } catch (error) {
            next(error);
        }
    })

    // GET QUOTE BY ID
    .get("/:id", async (req, res, next) => {
        try {
            const quote = await Quote.getById(req.params.id);

            res.send(quote);
        } catch (error) {
            next(error);
        }
    });
