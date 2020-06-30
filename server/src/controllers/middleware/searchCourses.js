const {
  getCourseByCatIdName,
  getCourseByCatIdNameCount,
} = require('../../database/queries');

const { searchCoursesSchema } = require('../../utils');

module.exports = async (req, res, next) => {
  try {
    const { catId, courseName, offset } = req.body;
    await searchCoursesSchema.validate({ courseName, catId });

    const {
      rows: [{ count }],
    } = await getCourseByCatIdNameCount(catId, courseName);

    const { rows } = await getCourseByCatIdName(catId, courseName, offset);
    res.json({ rows, count });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: 'invalid input' });
    } else {
      next(err);
    }
  }
};
