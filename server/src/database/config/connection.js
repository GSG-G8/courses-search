require('env2')('../.env');
const { Pool } = require('pg');

const keys = {
  development: 'DB_URL',
  production: 'DATABASE_URL',
  test: 'TEST_DB_URL',
};

const dbUrl = process.env[keys[process.env.NODE_ENV]];
if (!dbUrl) throw new Error('No Database URL!!!');

const options = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

module.exports = new Pool(options);
