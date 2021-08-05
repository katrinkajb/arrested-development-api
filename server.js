require("dotenv").config();
require("./data/lib/client").connect();

const app = require("./data/lib/app");

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Started on ${PORT}`);
});
