const { addFavoriteFolderQuery } = require('../../database/queries');
const { folderTitleSchema } = require('../../utils');

module.exports = async (req, res, next) => {
  const { id } = req.user;
  const { title } = req.body;
  try {
    await folderTitleSchema.validate({ title });
    const { rows } = await addFavoriteFolderQuery(id, title);
    res.json({ message: 'new folder has added successfully', rows });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'invalid inputs..!' });
    } else {
      next(error);
    }
  }
};
