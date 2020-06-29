import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import {
  notification,
  Button,
  Spin,
  Rate,
  TreeSelect,
  Input,
  Empty,
} from 'antd';
import { AudioOutlined } from '@ant-design/icons';

import axios from 'axios';
import categories from '../../assets/categories';
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

const HomePage = ({ history }) => {
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
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
  const treeSelectOnChange = (value) => {
    if (searchCourseName) {
      setCat(value);
      fetchCoursesByNameAndCatId(value, searchCourseName);
    }
  };
  const inputOnSearch = (value) => {
    if (value.value) {
      setSearchCourseName(value);
      fetchCoursesByNameAndCatId(cat, value);
    }
  };
  const inputOnChange = (e) => {
    setSearchCourseName(e.target.value);
    fetchCoursesByNameAndCatId(cat, e.target.value);
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
          // value={cat}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={categories}
          // treeDefaultExpandAll
          onChange={treeSelectOnChange}
          // onSearch={treeSelectOnChange}
          // showSearch
          placeholder="Please select"
          treeDefaultExpandAll
        />

        <Search
          style={{ width: '20%' }}
          placeholder="input search text"
          onSearch={inputOnSearch}
          onChange={inputOnChange}
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
              {course.rate && (
                <span>
                  <Rate
                    value={Math.round(course.rate * 2) / 2}
                    Rate
                    allowHalf
                  />
                </span>
              )}
              <h3>{course.source}</h3>
              <Button onClick={() => handleClick(course.id)} type="primary">
                {' '}
                More
              </Button>
            </div>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

HomePage.propTypes = {
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
};
export default HomePage;
