const categories = [
  {
    label: 'All Categories',
    value: 0,
    checkable: true,
  },
  {
    label: 'development',
    value: 'c-0',
    children: [
      { label: 'web development', value: 1 },
      { label: 'mobile apps', value: 2 },
      { label: 'software engineering', value: 3 },
      { label: 'databases', value: 4 },
    ],
  },
  {
    label: 'business',
    value: 'c-1',
    children: [
      { label: 'finance', value: 5 },
      { label: 'management', value: 6 },
      { label: 'communications', value: 7 },
      { label: 'data and analytics', value: 8 },
    ],
  },
  {
    label: 'lifeStyle',
    value: 'c-2',
    children: [
      { label: 'food and beverage', value: 9 },
      { label: 'arts and crafts', value: 10 },
      { label: 'music', value: 11 },
      { label: 'photography', value: 12 },
    ],
  },
  {
    label: 'Teaching and Academics',
    value: 'c-3',
    children: [
      { label: 'science', value: 13 },
      { label: 'math', value: 14 },
      { label: 'online education', value: 15 },
      { label: 'engineering', value: 16 },
    ],
  },
  {
    label: 'Marketing',
    value: 'c-4',
    children: [
      { label: 'public relations', value: 17 },
      { label: 'digital marketing', value: 18 },
      { label: 'social media marketing', value: 19 },
      { label: 'marketing fundamentals', value: 20 },
    ],
  },
  {
    label: 'Design',
    value: 'c-5',
    children: [
      { label: 'graphic design', value: 21 },
      { label: 'architectural design', value: 22 },
      { label: 'design tools', value: 23 },
      { label: 'user experience', value: 24 },
    ],
  },
];

export default categories;
