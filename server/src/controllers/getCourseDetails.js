const { getcourseById } = require('../database/queries');

exports.getCourseById = async (req, res, next) => {
  try {
    const { courseId: id } = req.params;
    const { rows } = await getcourseById(id);
    if (rows.length !== 0) {
      res.json(rows);
    } else {
      res.status(404).json({
        message: "Sorry There's no courses..!",
      });
    }
  } catch (err) {
    next(err);
  }
};
