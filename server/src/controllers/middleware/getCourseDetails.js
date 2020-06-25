const { getcourseById, courseComment } = require('../../database/queries');
const { courseDetailsSchema } = require('../../utils');

module.exports = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    await courseDetailsSchema.validate({ courseId });
    const { rows: details } = await getcourseById(courseId);
    const { rows: comments } = await courseComment(courseId);
    if (details.length !== 0) {
      res.json({ courseDetails: details[0], comments });
    } else {
      res.status(404).json({
        message: 'Sorry, this course is not available..!',
      });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: 'invalid inputs..!' });
    } else {
      next(err);
    }
  }
};
