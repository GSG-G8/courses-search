import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { notification, Button, Spin } from 'antd';

import './style.css';

const HomePage = () => {
  // const [loading, isLoading] = useState(true);
  const [topcourses, setTopCourses] = useState([]);

  const fetchTopCourses = () =>
    fetch(`/api/v1/topCourses`)
      .then((res) => {
        if (!res.ok) {
          res.json().then(notification.error);
          throw res.statusText;
        }
        return res.json();
      })
      .then((results) => {
        // console.log(results);
        setTopCourses(results);
      });

  useEffect(() => {
    fetchTopCourses();
  }, []);
  return (
    <div className="Home">
      hi from homepage
      {/* {topcourses} */}
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
