const express = require("express");
const cors = require("cors");
const client = require("./client.js");
const app = express();
const morgan = require("morgan");
const ensureAuth = require("./auth/ensure-auth");
const createAuthRoutes = require("./auth/create-auth-routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev")); // http logging

const authRoutes = createAuthRoutes();

app.use("/auth", authRoutes);

app.use("/api", ensureAuth);

app.get("/api/test", (req, res) => {
    res.json({
        message: `in this protected route, we get the user's id like so: ${req.userId}`,
    });
});

app.get("/characters", async (req, res) => {
    try {
        const data = await client.query("SELECT * from characters");

        res.json(data.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// app.get("/characters/:id", async (req, res) => {
//     try {
//         const data = await client.query("SELECT * from characters WHERE id=")
//     }
// });

app.use(require("./middleware/error"));

module.exports = app;
