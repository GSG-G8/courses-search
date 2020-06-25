const { addComment } = require('../../database/queries');
const { commentSchema } = require('../../utils');

module.exports = async (req, res, next) => {
  const { courseId } = req.params;
  const { content } = req.body;
  const { id: userId } = req.user;

  try {
    await commentSchema.validate({ courseId, content });
    const { rowCount } = await addComment(userId, courseId, content);
    res.json({ rowCount });
  } catch (error) {
    next(error);
  }
};
