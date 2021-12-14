const pool = require('./lib/utils/pool.js');
const setup = require('./data/setup.js');

setup(pool)
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err))
    .finally(() => process.exit());
