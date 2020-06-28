const {
  getCourseByName,
  getCourseByCatIdName,
} = require('../../database/queries');

const { searchCoursesSchema } = require('../../utils');

module.exports = async (req, res, next) => {
  try {
    const { catId, courseName = '' } = req.body;
    await searchCoursesSchema.validate({ courseName, catId });

    if (catId) {
      const { rows } = await getCourseByCatIdName(catId, courseName);
      res.json(rows);
    } else {
      const { rows } = await getCourseByName(courseName);
      res.json(rows);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: 'invalid input' });
    } else {
      next(err);
    }
  }
};
