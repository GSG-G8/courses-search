const {
  getCourseByName,
  getCourseByCatIdName,
} = require('../../database/queries');

const { searchCoursesSchema } = require('../../utils');

module.exports = async (req, res, next) => {
  try {
    const { catId, courseName } = req.body;

    await searchCoursesSchema.validate({ courseName });

    if (catId < 0) {
      res.status(400).json({ message: 'Invalid input' });
    } else if (catId > 0) {
      const { rows } = await getCourseByCatIdName(catId, courseName);
      res.json(rows);
    } else {
      const { rows } = await getCourseByName(courseName);
      res.json(rows);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: 'invalid courseName' });
    } else {
      next(err);
    }
  }
};
