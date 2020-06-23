const { getcourseById } = require('../../database/queries');
const { courseDetailsSchema } = require('../../utils');

exports.getCourseDetails = async (req, res, next) => {
  try {
    const { courseId: id } = req.params;
    await courseDetailsSchema.validate({ id });
    const { rows } = await getcourseById(id);
    if (rows.length !== 0) {
      res.json(rows);
    } else {
      res.status(404).json({
        message: 'Sorry, this course is not avalible..!',
      });
    }
  } catch (err) {
    next(err);
  }
};
