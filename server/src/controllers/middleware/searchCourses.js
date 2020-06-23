const {
  getCourseByName,
  getCourseByCatIdName,
} = require('../../database/queries');

const getCoursesByCatIdName = async (req, res, next) => {
  try {
    const { catId } = req.params;
    const { courseName } = req.body;
    console.log(req.body, 5);

    if (catId === 0) {
      const { rows } = await getCourseByName(courseName);
      console.log(rows, 2);
      return res.json(rows);
    }
    const { rows } = await getCourseByCatIdName(catId, courseName);
    console.log(rows);
    return res.json(rows);
  } catch (err) {
    return next(err);
  }
};

module.exports = { getCoursesByCatIdName };
