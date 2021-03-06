const yup = require('yup');

const courseDetailsSchema = yup.object({
  courseId: yup.number().positive(),
});

const folderIdSchema = yup.object({
  folderId: yup.number().positive().required(),
});

const addCourseToFolder = yup.object({
  courseId: yup.number().positive().required(),
  folderId: yup.number().positive().required(),
});

const searchCoursesSchema = yup.object().shape({
  courseName: yup.string(),
  catId: yup.string(),
});

const folderTitleSchema = yup.object().shape({
  title: yup.string().required(),
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
  folderTitleSchema,
  addCourseToFolder,
  commentSchema,
  idSchema,
  folderIdSchema,
};
