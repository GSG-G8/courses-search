const {
  deleteCourseFromFolderQuery,
  checkUserFolder,
} = require('../../database/queries');
const { addCourseToFolder } = require('../../utils');

module.exports = async (req, res, next) => {
  const { folderId, courseId } = req.params;
  const { id } = req.user;

  try {
    await addCourseToFolder.validate({ courseId, folderId });
    const integerFolderId = Number(folderId);
    const { rows } = await checkUserFolder(id);
    const isUserHaveFolder = rows.some(
      (folder) => folder.id === integerFolderId
    );
    if (isUserHaveFolder) {
      const { rowCount } = await deleteCourseFromFolderQuery(id, courseId);
      if (rowCount) {
        res.json({ message: 'course remove from folder successfully' });
      } else {
        res.status(404).json({ message: 'course not in your favorite' });
      }
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
