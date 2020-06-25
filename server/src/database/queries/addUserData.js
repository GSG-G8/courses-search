const connection = require('../config/connection');

const addUserData = (data) => {
  const { name, email } = data;
  return connection.query(
    `INSERT INTO users (name, email) VALUES
    ($1, $2) ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name RETURNING *`,
    [name, email]
  );
};

module.exports = addUserData;
