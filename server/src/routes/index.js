const router = require('express').Router();
const { getCoursesByCatId } = require('./course');

router.get('/:categoryId/courses', getCoursesByCatId);

// router.get('/hello', (req, res) => {
//   res.send('Hello');
// });

module.exports = router;
