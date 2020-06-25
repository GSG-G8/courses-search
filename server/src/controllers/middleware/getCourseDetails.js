const { getcourseById } = require('../../database/queries');
const { courseDetailsSchema } = require('../../utils');

module.exports = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    await courseDetailsSchema.validate({ courseId });
    const { rows } = await getcourseById(courseId);
    if (rows.length !== 0) {
      res.json(rows);
    } else {
      res.status(404).json({
        message: 'Sorry, this course is not avalible..!',
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
