const { getFavoriteCourse } = require('../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { rows } = await getFavoriteCourse(id);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};
