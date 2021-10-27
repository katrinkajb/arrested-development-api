const { Router } = require("express");
const chickens = require("../../data/seed-data/chickens.js");
const Chicken = require("../models/Chicken.js");

module.exports = Router()
    // GET ALL CHICKEN DANCE GIFS
    .get("/", async (req, res, next) => {
        try {
            const chickens = await Chicken.getAll();
            res.send(chickens);
        } catch (error) {
            next(error);
        }
    })

    // GET RANDOM CHICKEN DANCE GIF
    .get("/random", async (req, res, next) => {
        const randomNumber = Math.ceil(Math.random() * (chickens.length - 1));
        try {
            const chicken = await Chicken.getRandom(randomNumber);
            res.send(chicken);
        } catch (error) {
            next(error);
        }
    });
