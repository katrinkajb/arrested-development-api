const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static(`${__dirname}/../public`));
app.use(express.json());

app.use("/characters", require("./controllers/characters.js"));
app.use("/quotes", require("./controllers/quotes.js"));
app.use("/chicken", require("./controllers/chickens.js"));

app.use(require("./middleware/not-found.js"));
app.use(require("./middleware/error.js"));

module.exports = app;
