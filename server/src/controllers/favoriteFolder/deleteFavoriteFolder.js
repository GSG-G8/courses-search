const {
  deleteFavoriteFolderQuery,
  checkUserFolder,
} = require('../../database/queries');
const { folderIdSchema } = require('../../utils');

module.exports = async (req, res, next) => {
  const { folderId } = req.params;
  const { id } = req.user;

  try {
    await folderIdSchema.validate({ folderId });
    const integerFolderId = Number(folderId);
    const { rows } = await checkUserFolder(id);
    const isUserHaveFolder = rows.some(
      (folder) => folder.id === integerFolderId
    );
    if (isUserHaveFolder) {
      await deleteFavoriteFolderQuery(folderId, id);
      res.json({ message: 'folder has deleted successfully' });
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
