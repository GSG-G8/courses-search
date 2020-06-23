const yup = require('yup');

const favoriteSchema = yup.object({
  userId: yup.number().positive(),
});

const courseDetailsSchema = yup.object({
  courseId: yup.number().positive(),
});
module.exports = { favoriteSchema, courseDetailsSchema };
