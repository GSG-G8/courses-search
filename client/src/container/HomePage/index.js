import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import {
  notification,
  Button,
  Spin,
  Rate,
  TreeSelect,
  Input,
  Alert,
} from 'antd';
import { AudioOutlined } from '@ant-design/icons';

import axios from 'axios';
import categories from './categories';
import './style.css';

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const HomePage = (props) => {
  const { history } = props;
  const [loading, isLoading] = useState(true);
  const [topcourses, setTopCourses] = useState([]);
  const [searchCourseName, setSearchCourseName] = useState('');
  const [cat, setCat] = useState('');

  const fetchCoursesByNameAndCatId = async (catId, courseName) => {
    try {
      const { data } = await axios.post(`/api/v1/catId/courseName`, {
        catId,
        courseName,
      });
      setTopCourses(data);
    } catch (err) {
      let error;
      if (err.response) error = err.response.data.msg || 'Something went wrong';
      else error = 'No Course with this name';
      notification.error({ message: error });
    }
  };

  const fetchTopCourses = async () => {
    try {
      const { data } = await axios.get(`/api/v1/topCourses`);
      setTopCourses(data);
      isLoading(false);
    } catch (err) {
      let error;
      if (err.response) error = err.response.data.msg || 'Something went wrong';
      else error = 'No Courses';
      notification.error({ message: error });
    }
  };
  const handleClick = (id) => {
    history.push(`/course/${id}`);
  };
  const onChange = (value) => {
    setCat(value);
    fetchCoursesByNameAndCatId(value, searchCourseName);
  };
  const onInputChange = (value) => {
    setSearchCourseName(value);
    fetchCoursesByNameAndCatId(cat, value);
  };
  useEffect(() => {
    fetchTopCourses();
  }, []);
  // const treeData =
  //  categories.map((catt) => ({
  //   title: catt.title,
  //   value: catt.value,
  //   children: catt.children,
  // }));

  return (
    <div>
      <div className="search-container">
        <TreeSelect
          style={{ width: '20%', marginRight: '10px' }}
          placeholder="Please select category"
          value={cat}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={categories}
          // treeDefaultExpandAll
          onChange={onChange}
          // selectable={false}
          // onSearch={onChange}
          // showSearch
        />

        <Search
          style={{ width: '20%' }}
          placeholder="input search text"
          onSearch={onInputChange}
          enterButton
          suffix={suffix}
        />
      </div>

      <div className="topRate__container">
        {loading ? (
          <Spin />
        ) : topcourses.length > 0 ? (
          topcourses.map((course) => (
            <div className="topRate__course-card" key={course.id}>
              <h2>{course.title}</h2>
              <img
                className="topRate__course-card__image"
                alt="courseImg"
                src={course.image}
                // style={{ borderTopRightRadius: '50%' }}
              />
              <span>
                <Rate value={Math.round(course.rate * 2) / 2} Rate allowHalf />
              </span>
              <h3>{course.source}</h3>
              <Button onClick={() => handleClick(course.id)} type="primary">
                {' '}
                More
              </Button>
            </div>
          ))
        ) : (
          <Alert
            message="Sorry This Course Name Not Avaliable..!"
            type="warning"
          />
        )}
      </div>
    </div>
  );
};
HomePage.propTypes = {
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
};

export default HomePage;
