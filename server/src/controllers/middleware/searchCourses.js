const {
  getCourseByName,
  getCourseByCatIdName,
} = require('../../database/queries');

const { searchCoursesSchema } = require('../../utils');

const getCoursesByCatIdName = async (req, res, next) => {
  try {
    const { catId, courseName } = req.body;

    await searchCoursesSchema.validate({ courseName });

    if (catId === 0) {
      const { rows } = await getCourseByName(courseName);
      return res.json(rows);
    }
    if (catId > 0) {
      const { rows } = await getCourseByCatIdName(catId, courseName);
      return res.json(rows);
    }
    return res.status(400).json({ message: 'Invalid input' });
  } catch (err) {
    return next(err);
  }
};

module.exports = { getCoursesByCatIdName };
