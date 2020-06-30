const { getcourseByCatId } = require('../../database/queries');
// getCatCourses
const { getCatCourses } = require('../../utils/validation/index');

module.exports = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    await getCatCourses.validate({ categoryId });

    const { rows } = await getcourseByCatId(categoryId);
    if (rows.length) {
      res.json(rows);
    } else {
      res.status(404).json({
        message: "Sorry There's no courses for this category..!",
      });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: 'invalid inputs..!' });
    } else {
      next(err);
    }
  }
};
