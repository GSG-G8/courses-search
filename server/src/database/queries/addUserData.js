const connection = require('../config/connection');

const addUserData = (data) => {
  const { name, email, picture } = data;
  return connection.query(
    `INSERT INTO users (name, email, picture) VALUES
    ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name RETURNING *`,
    [name, email, picture]
  );
};

module.exports = addUserData;
