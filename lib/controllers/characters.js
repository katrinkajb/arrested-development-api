const { Router } = require("express");
const characters = require("../../data/seed-data.js/characters");
const Character = require("../models/Character");

module.exports = Router()
    // GET ALL CHARACTERS
    .get("characters", async (req, res, next) => {
        try {
            const characters = await Character.getAll();
            res.send(characters);
        } catch (error) {
            next(error);
        }
    })

    // GET RANDOM CHARACTER
    .get("/characters/random", async (req, res, next) => {
        const randomNumber = Math.ceil(Math.random() * (characters.length - 1));
        try {
            const character = await Character.getRandom(randomNumber);
            res.send(character);
        } catch (error) {
            next(error);
        }
    })

    // SEARCH CHARACTERS BY NAME
    .get("/characters/search/:query", async (req, res, next) => {
        try {
            const characters = await Character.searchCharacters(
                req.params.query
            );

            res.send(characters);
        } catch (error) {
            next(error);
        }
    })

    // GET CHARACTER BY ID
    .get("/characters/search/:id", async (req, res, next) => {
        try {
            const character = await Character.getById(req.params.id);

            res.send(character);
        } catch (error) {
            next(error);
        }
    });
