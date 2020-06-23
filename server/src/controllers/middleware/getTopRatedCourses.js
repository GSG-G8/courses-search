const { getTopCourses } = require('../../database/queries');

const getTopRatedCourses = async (req, res, next) => {
  try {
    const { rows } = await getTopCourses();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = getTopRatedCourses;
