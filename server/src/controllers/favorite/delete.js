const { deleteFavorite } = require('../../database/queries');

module.exports = async (req, res, next) => {
  const { courseId } = req.params;
  const userId = 1;
  try {
    const { rowCount } = await deleteFavorite(userId, courseId);
    res.json({ rowCount });
  } catch (error) {
    next(error);
  }
};
