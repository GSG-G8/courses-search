const { getFavoriteCourse, getUserById } = require('../../database/queries');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (id > 0) {
      const checkUser = await getUserById(id);
      if (checkUser.rowCount) {
        const { rows } = await getFavoriteCourse(id);
        if (rows.length) {
          res.json(rows);
        } else {
          res.json({
            message: 'There is no favorite courses for this user id',
          });
        }
      } else {
        res.status(404).json({
          message: 'Invalid id',
        });
      }
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: 'invalid inputs' });
    } else {
      next(err);
    }
  }
};
