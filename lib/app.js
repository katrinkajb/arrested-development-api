const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/../public`));

app.use("/characters", require("./controllers/characters.js"));
app.use("/quotes", require("./controllers/quotes.js"));
app.use("/chickens", require("./controllers/chickens.js"));

app.use(require("./middleware/not-found.js"));
app.use(require("./middleware/error.js"));

module.exports = app;
