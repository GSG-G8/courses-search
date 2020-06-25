const { deleteComment } = require('../../database/queries');
const { idSchema } = require('../../utils');

module.exports = async (req, res, next) => {
  const { commentId } = req.params;
  const { id: userId } = req.user;

  try {
    await idSchema.validate({ id: commentId });
    const { rowCount } = await deleteComment(userId, commentId);
    res.json({ rowCount });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'invalid inputs' });
    } else {
      next(error);
    }
  }
};
