const {
  getCourseByName,
  getCourseByCatIdName,
} = require('../../database/queries');

const getCoursesByCatIdName = async (req, res, next) => {
  try {
    const { catId } = req.params;
    const { courseName } = req.body;

    if (catId === 0) {
      const { rows } = await getCourseByName(courseName);
      return res.json(rows);
    }
    const { rows } = await getCourseByCatIdName(catId, courseName);
    return res.json(rows);
  } catch (err) {
    return next(err);
  }
};

module.exports = { getCoursesByCatIdName };
