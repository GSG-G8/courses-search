const yup = require('yup');

const favoriteSchema = yup.object({
  userId: yup.number().positive(),
});

module.exports = favoriteSchema;
