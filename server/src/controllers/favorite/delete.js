const { deleteFavorite } = require('../../database/queries');
const { courseDetailsSchema } = require('../../utils');

module.exports = async (req, res, next) => {
  const { courseId } = req.params;
  const { id: userId } = req.user;

  try {
    await courseDetailsSchema.validate({ courseId });
    const { rowCount } = await deleteFavorite(userId, courseId);
    res.json({ rowCount });
  } catch (error) {
    next(error);
  }
};
