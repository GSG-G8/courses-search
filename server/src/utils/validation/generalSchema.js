const yup = require('yup');

const favoriteSchema = yup.object({
  userId: yup.number().positive(),
});

const courseDetailsSchema = yup.object({
  courseId: yup.number().positive(),
});

const searchCoursesSchema = yup.object({
  courseName: yup.string(),
});

module.exports = { favoriteSchema, courseDetailsSchema, searchCoursesSchema };
