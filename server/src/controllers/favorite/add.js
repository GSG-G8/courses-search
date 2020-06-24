const { addFavorite } = require('../../database/queries');

module.exports = async (req, res, next) => {
  const { courseId } = req.params;
  const userId = 1;
  try {
    const results = await addFavorite(userId, courseId);
    res.json(results.rowCount);
  } catch (error) {
    next(error);
  }
};
