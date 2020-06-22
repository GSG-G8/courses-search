const axios = require('axios');
const { addUdemyCourse } = require('../../database/queries');

const udemyData = async () => {
  const udemyCategory = {
    8: 1,
    10: 2,
    20: 3,
    16: 4,
    24: 5,
    30: 6,
    28: 7,
    44: 8,
    182: 9,
    180: 10,
    312: 13,
    310: 14,
    523: 15,
    366: 16,
    74: 17,
    62: 18,
    66: 19,
    70: 20,
    110: 21,
    124: 22,
    112: 23,
    114: 24,
  };
  const DatabaseCategoryIds = Object.keys(udemyCategory);

  const makeUdemyRequest = async (item) =>
    axios.get(
      `https://www.udemy.com/api-2.0/discovery-units/all_courses/?p=3&page_size=60&source_page=subcategory_page&sos=ps&fl=scat&subcategory_id=${item}`
    );

  const getUdemyData = async () =>
    Promise.all(DatabaseCategoryIds.map(makeUdemyRequest));

  const insertOneUdemyCourse = async (item) => {
    const {
      data: {
        unit: { source_objects: categoryInfo, items },
      },
    } = item;
    const { id: originCategoryId } = categoryInfo[0];

    items.forEach((course) => {
      const oneCourse = course;
      oneCourse.source = 'udemy';
      oneCourse.categoryId = udemyCategory[originCategoryId];
      oneCourse.author = oneCourse.visible_instructors[0].name;
      addUdemyCourse(course);
    });
  };

  const insertAllUdemyCourse = async (arrayOfData) =>
    Promise.all(arrayOfData.map(insertOneUdemyCourse));

  const udemyCourses = await getUdemyData();
  insertAllUdemyCourse(udemyCourses);
};

module.exports = udemyData;
