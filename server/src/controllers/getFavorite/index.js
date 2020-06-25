const { getFavoriteCourse } = require('../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { rows } = await getFavoriteCourse(id);
    if (rows.length) {
      res.json(rows);
    } else {
      res.json({
        message: 'There is no favorite courses for this user id',
      });
    }
  } catch (err) {
    next(err);
  }
};
