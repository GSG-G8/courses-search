const yup = require('yup');

const courseDetailsSchema = yup.object({
  courseId: yup.number().positive(),
});

const searchCoursesSchema = yup.object().shape({
  courseName: yup.string(),
  catId: yup.string(),
});
const getCatCourses = yup.object().shape({
  categoryId: yup.number().positive(),
});

module.exports = { courseDetailsSchema, searchCoursesSchema, getCatCourses };
