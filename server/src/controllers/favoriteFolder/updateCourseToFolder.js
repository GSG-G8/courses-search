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
    const isUserHaveFolder = rows.some(
      (folder) => folder.id === Number(folderId)
    );
    if (isUserHaveFolder) {
      await addCourseToFolderQuery(id, courseId, folderId);
      res.json({ message: 'course assigned to folder successfully' });
    } else {
      res.status(401).json({ message: 'Un-Authorized' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'invalid inputs..!' });
    } else {
      next(error);
    }
  }
};
