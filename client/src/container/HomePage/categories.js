const categories = [
  {
    title: 'All',
    value: 0,
    checkable: true,
  },
  {
    title: 'development',
    value: 'c-0',
    selectable: false,
    children: [
      { title: 'web development', value: 1 },
      { title: 'mobile apps', value: 2 },
      { title: 'software engineering', value: 3 },
      { title: 'databases', value: 4 },
    ],
  },
  {
    title: 'business',
    value: 'c-1',
    selectable: false,
    children: [
      { title: 'finance', value: 5 },
      { title: 'management', value: 6 },
      { title: 'communications', value: 7 },
      { title: 'data and analytics', value: 8 },
    ],
  },
  {
    title: 'lifeStyle',
    value: 'c-2',
    selectable: false,
    children: [
      { title: 'food and beverage', value: 9 },
      { title: 'arts and crafts', value: 10 },
      { title: 'music', value: 11 },
      { title: 'photography', value: 12 },
    ],
  },
  {
    title: 'Teaching and Academics',
    value: 'c-3',
    selectable: false,
    children: [
      { title: 'science', value: 13 },
      { title: 'math', value: 14 },
      { title: 'online education', value: 15 },
      { title: 'engineering', value: 16 },
    ],
  },
  {
    title: 'Marketing',
    value: 'c-4',
    selectable: false,
    children: [
      { title: 'public relations', value: 17 },
      { title: 'digital marketing', value: 18 },
      { title: 'social media marketing', value: 19 },
      { title: 'marketing fundamentals', value: 20 },
    ],
  },
  {
    title: 'Design',
    value: 'c-5',
    selectable: false,
    children: [
      { title: 'graphic design', value: 21 },
      { title: 'architectural design', value: 22 },
      { title: 'design tools', value: 23 },
      { title: 'user experience', value: 24 },
    ],
  },
];

export default categories;
