import React, { useState, useEffect } from 'react';
import { notification, Button, Spin, Menu, Dropdown } from 'antd';
import { useHistory } from 'react-router-dom';
// import { object } from 'prop-types';
import axios from 'axios';
import categories from './categories';
import './style.css';

const HomePage = () => {
  const [loading, isLoading] = useState(true);
  const [topcourses, setTopCourses] = useState([]);
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
      setTopCourses(data);
      isLoading(false);
    } catch (err) {
      notification.error(err);
    }
  };

  return (
    <>
      <div className="Home">
        {loading && <Spin />}

        {categories.map(({ title: main, children }) => (
          <Dropdown
            overlay={() => (
              <Menu>
                {children.map(({ title, value }) => (
                  <Menu.Item
                    onClick={({ key }) => fetchCategoryCourses(key)}
                    key={value}
                  >
                    {title}
                  </Menu.Item>
                ))}
              </Menu>
            )}
            placement="bottomLeft"
          >
            <Button>{main}</Button>
          </Dropdown>
        ))}

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
    </>
  );
};

export default HomePage;
