const yup = require('yup');

const courseDetailsSchema = yup.object({
  courseId: yup.number().positive(),
});

const searchCoursesSchema = yup.object().shape({
  courseName: yup.string().required(),
});

module.exports = { courseDetailsSchema, searchCoursesSchema };
