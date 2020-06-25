import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { notification, Button, Spin, Rate } from 'antd';
// import { useHistory } from 'react-router-dom';

import axios from 'axios';

import './style.css';

const HomePage = (props) => {
  const [loading, isLoading] = useState(true);
  const [topcourses, setTopCourses] = useState([]);
  const { history } = props;

  const fetchTopCourses = async () => {
    try {
      const { data } = await axios.get(`/api/v1/topCourses`);
      const courseData = data.map((course) => {
        let rateDes = '';
        const courseRate = parseFloat(course.rate);
        if (courseRate >= 4.5) rateDes = 'wonderful';
        else if (courseRate > 3.5) rateDes = 'good';
        else if (courseRate > 2.5) rateDes = 'normal';
        else if (courseRate > 1.5) rateDes = 'bad';
        else rateDes = 'terrible';
        return { ...course, rateDes };
      });
      setTopCourses(courseData);
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

  return (
    <div className="topRate__container">
      {loading && <Spin />}

      {topcourses.map((course) => (
        <div className="topRate__course-card" key={course.id}>
          <h2>{course.title}</h2>
          <img
            className="topRate__course-card__image"
            alt="courseImg"
            src={course.image}
            // style={{ borderTopRightRadius: '50%' }}
          />
          {/* <p>Rate: {course.rate}</p> */}
          <span>
            <Rate
              // tooltips={course.rateDes}
              value={parseFloat(Math.round(course.rate * 2) / 2)}
              Rate
              allowHalf
            />
            <span className="ant-rate-text">{course.rateDes}</span>
          </span>
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
HomePage.propTypes = {
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
};

export default HomePage;
