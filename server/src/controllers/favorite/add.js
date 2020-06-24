const { addFavorite } = require('../../database/queries');

module.exports = async (req, res, next) => {
  const { courseId } = req.params;
  const userId = 1;
  try {
    const { rowCount } = await addFavorite(userId, courseId);
    res.json({ rowCount });
  } catch (error) {
    next(error);
  }
};
