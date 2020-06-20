const { getcourseByCatId } = require('../database/queries');

exports.getCoursesByCatId = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (categoryId > 0) {
      const { rows } = await getcourseByCatId(categoryId);
      if (rows.length !== 0) {
        res.json({ statusCode: 200, data: rows });
      } else {
        res.status(404).json({
          statusCode: 404,
          message: "Sorry There's no courses for this category..!",
        });
      }
    } else {
      res.status(400).json({
        statusCode: 400,
        message: 'wrong category Id',
      });
    }
  } catch (err) {
    next(err);
  }
};
