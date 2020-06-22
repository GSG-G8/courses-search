const axios = require('axios');
const { insertCourses } = require('../../database/queries');

const categories = require('./categories.json');

const coursePerCategory = 20;
const url = 'https://www.coursera.org/graphqlBatch?opname=catalogResultQuery';
const query = `query catalogResultQuery(
  $facets: [String!]!,
  $start: String!,
  $limit: Int
) {
  CatalogResultsV2Resource {
    browseV2(
      facets: $facets,
      start: $start,
      limit: $limit
    ) {
      elements {
        courses {
          elements {
            slug, name, photoUrl, description,
            partners { elements { name } },
            courseDerivativesV2 { averageFiveStarRating, ratingCount }
          }
        }
      }
    }
  }
}
`;

async function getCourses() {
  const jsonData = categories.map((category) => ({
    operationName: 'catalogResultQuery',
    variables: {
      start: '0',
      limit: coursePerCategory,
      facets: [
        'languages:English',
        'entityTypeTag:Courses',
        `skillNameMultiTag:${category.skills}`,
        `subcategoryMultiTag:${category.domain}`,
      ],
    },
    query,
  }));

  try {
    const response = await axios.post(url, jsonData);

    let allCourses = [];
    categories.forEach((category, catId) => {
      const coursesData =
        response.data[catId].data.CatalogResultsV2Resource.browseV2.elements[0]
          .courses.elements;

      const courses = coursesData.map((course) => ({
        category_id: catId + 1,
        title: course.name,
        image: course.photoUrl,
        author_name: course.partners.elements[0].name,
        url: `https://www.coursera.org/learn/${course.slug}`,
        rate: course.courseDerivativesV2.averageFiveStarRating || 0,
        reviews: course.courseDerivativesV2.ratingCount || 0,
        description: course.description,
        source: 'coursera',
      }));

      allCourses = allCourses.concat(courses);
    });

    await insertCourses(allCourses);
    return allCourses;
  } catch (error) {
    return error;
  }
}

module.exports = async (req, res) => {
  const courses = await getCourses();
  res.json({ count: courses.length });
};
