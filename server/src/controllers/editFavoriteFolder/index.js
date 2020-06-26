const {
  editFavoriteFolderQuery,
  checkUserFolder,
} = require('../../database/queries');
const { folderTitleSchema } = require('../../utils');

module.exports = async (req, res, next) => {
  const { id } = req.user;
  const { title, folderId } = req.body;
  try {
    const { rows } = await checkUserFolder(id);
    const isUserHaveFolder = rows.some((folder) => folder.id === folderId);
    if (isUserHaveFolder) {
      await folderTitleSchema.validate({ title });
      await editFavoriteFolderQuery(title, folderId);
      res.json({ message: 'folder title updated successfully' });
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
