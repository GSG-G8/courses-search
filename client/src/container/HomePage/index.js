import React, { useState, useEffect } from 'react';
import { notification, Button, Spin, Menu, Dropdown } from 'antd';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import categories from './categories';
// import categoriesId from './categoryId';
import './style.css';
import { object } from 'prop-types';

const HomePage = () => {
  const [loading, isLoading] = useState(true);
  const [topcourses, setTopCourses] = useState([]);
  const [categoryCourses, setCategoryCourses] = useState([]);
  const history = useHistory();

  const fetchTopCourses = async () => {
    try {
      const { data } = await axios.get(`/api/v1/topCourses`);
      setTopCourses(data);
      isLoading(false);
    } catch (err) {
      notification.error(err);
    }
  };
  const handleClick = (id) => {
    history.push(`/detailsPage/${id}`);
  };
  useEffect(() => {
    fetchTopCourses();
  }, []);

  const fetchCategoryCourses = async (categoryId) => {
    try {
      const { data } = await axios.get(`/api/v1/${categoryId}/courses`);
      setCategoryCourses(data);
      isLoading(false);
    } catch (err) {
      notification.error(err);
    }
  };

  const mainCategories = categories.map((cat) => {
    const value = Object.values(cat);
    // console.log(key[0]);
    return value[0];
  });

  const subCategories = categories.map((cat) => {
    const subValue = Object.values(cat);
    // console.log(subValue[2]);
    const getCat = subValue[2].map((cat) => {
      const subcat = Object.values(cat);
      // console.log(subcat[0]);
      return subcat[0];
    });
    return getCat;
  });

  console.log(subCategories);

  const MENU = (
    <Menu>
      <Menu.Item>
        <Button type="primary" onClick={() => fetchCategoryCourses(3)}>
          {subCategories}
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="Home">
      {loading && <Spin />}

      <div>
        <Dropdown overlay={() => MENU} placement="bottomLeft">
          <Button type="primary">{mainCategories}</Button>
        </Dropdown>
      </div>

      {topcourses.map((course) => (
        <div key={course.id}>
          <h2>{course.title}</h2>
          <img alt="courseImg" src={course.image} />
          <p>Rate: {course.rate}</p>
          <h3>{course.source}</h3>
          <Button onClick={() => handleClick(course.id)} type="primary">
            {' '}
            More
          </Button>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
