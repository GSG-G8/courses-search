const { getTopCourses } = require('../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const { rows } = await getTopCourses();
    if (!rows.length) {
      return res.status(404).json({ courses: 'No courses with rate 5' });
    }
    return res.json(rows);
  } catch (err) {
    return next(err);
  }
};
