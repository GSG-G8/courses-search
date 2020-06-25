const {
  addCourseToFolderQuery,
  checkUserFolder,
} = require('../../database/queries');
const { addCourseToFolder } = require('../../utils');

module.exports = async (req, res, next) => {
  const { id } = req.user;
  const { courseId, folderId } = req.body;
  try {
    await addCourseToFolder.validate({ courseId, folderId });
    const { rows } = await checkUserFolder(id);
    const isUserHaveFolder = Object.keys(rows).includes(folderId);
    if (isUserHaveFolder) {
      await addCourseToFolderQuery(id, courseId, folderId);
      res.json({ message: 'course assigned to folder successfully' });
    } else {
      res
        .status(400)
        .json({ message: 'this folder not available for this user' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'invalid inputs..!' });
    } else {
      next(error);
    }
  }
};
