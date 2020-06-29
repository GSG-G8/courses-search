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

const commentSchema = yup.object().shape({
  content: yup.string().max(255).required(),
  courseId: yup.number().min(1).required(),
});

const idSchema = yup.object().shape({
  id: yup.number().min(1).required(),
});

module.exports = {
  courseDetailsSchema,
  searchCoursesSchema,
  commentSchema,
  idSchema,
  getCatCourses,
};
