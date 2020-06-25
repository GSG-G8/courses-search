const yup = require('yup');

const courseDetailsSchema = yup.object({
  courseId: yup.number().positive(),
});

const addCourseToFolder = yup.object({
  courseId: yup.number().positive().required(),
  folderId: yup.number().positive().required(),
});

const searchCoursesSchema = yup.object().shape({
  courseName: yup.string().required(),
});

const folderTitleSchema = yup.object().shape({
  title: yup.string().required(),
});

module.exports = {
  courseDetailsSchema,
  searchCoursesSchema,
  folderTitleSchema,
  addCourseToFolder,
};
