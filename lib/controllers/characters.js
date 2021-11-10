const { Router } = require("express");
const characters = require("../../data/seed-data/characters");
const Character = require("../models/Character");

module.exports = Router()
    // GET ALL CHARACTERS
    .get("/", async (req, res, next) => {
        try {
            const characters = await Character.getAll();
            res.send(characters);
        } catch (error) {
            next(error);
        }
    })

    // GET RANDOM CHARACTER
    .get("/random", async (req, res, next) => {
        const randomNumber = Math.ceil(Math.random() * (characters.length - 1));
        try {
            const character = await Character.getRandom(randomNumber);
            res.send(character);
        } catch (error) {
            next(error);
        }
    })

    // SEARCH CHARACTERS BY NAME
    .get("/search/:query", async (req, res, next) => {
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
    .get("/:id", async (req, res, next) => {
        try {
            const id = req.params.id;
            const character = await Character.getById(id);

            res.send(character);
        } catch (error) {
            next(error);
        }
    });
