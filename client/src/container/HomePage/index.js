import React, { useState, useEffect } from 'react';
import { notification, Button, Spin } from 'antd';
import axios from 'axios';

import './style.css';

const HomePage = () => {
  const [loading, isLoading] = useState(true);
  const [topcourses, setTopCourses] = useState([]);

  const fetchTopCourses = async () => {
    try {
      const { data } = await axios.get(`/api/v1/topCourses`);
      setTopCourses(data);
      isLoading(false);
    } catch (err) {
      notification.error(err);
    }
  };
  useEffect(() => {
    fetchTopCourses();
  }, []);
  return (
    <div className="Home">
      {loading && <Spin />}

      {topcourses.map((course) => (
        <div key={course.id}>
          <h2>{course.title}</h2>
          <img alt="courseImg" src={course.image} />
          <p>Rate: {course.rate}</p>
          <h3>{course.source}</h3>
          <Button type="primary"> More</Button>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
