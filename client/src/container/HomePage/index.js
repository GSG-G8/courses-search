import React, { useState, useEffect } from 'react';
import {
  Button,
  Spin,
  Menu,
  Rate,
  TreeSelect,
  Input,
  Empty,
  Result,
} from 'antd';
import { AlignLeftOutlined, AudioOutlined } from '@ant-design/icons';

import propTypes from 'prop-types';
import axios from 'axios';
import categories from '../../assets/categories';
import './style.css';

const { SubMenu } = Menu;

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
  const [courses, setCourses] = useState([]);
  const [searchCourseName, setSearchCourseName] = useState('');
  const [cat, setCat] = useState(0);
  const [error, setError] = useState('');

  const fetchCoursesByNameAndCatId = async (catId, courseName) => {
    try {
      const { data } = await axios.post(`/api/v1/catId/courseName`, {
        catId,
        courseName,
      });
      setCourses(data);
      setLoading(false);
      setError('');
    } catch (err) {
      const message =
        err.response.data.message || 'Something went wrong, try again later';
      setLoading(false);
      setError(message);
    }
  };

  const fetchTopCourses = async () => {
    try {
      const { data } = await axios.get(`/api/v1/topCourses`);
      setCourses(data);
      setLoading(false);
      setError('');
    } catch (err) {
      let message;
      if (err.response) {
        message = err.response.data.message;
      } else {
        message = 'Something went wrong, try again later';
      }

      setLoading(false);
      setError(message);
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
    if (value) {
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

  const fetchCategoryCourses = async (categoryId) => {
    try {
      const { data } = await axios.get(`/api/v1/${categoryId}/courses`);
      setCourses(data);
      setLoading(false);
    } catch (err) {
      let message;
      if (err.response) {
        message = err.response.data.message;
      } else {
        message = 'Something went wrong, try again later';
      }

      setLoading(false);
      setError(message);
    }
  };

  return (
    <div>
      {error ? (
        <Result status="error" title="Internal server Error." />
      ) : loading ? (
        <Spin />
      ) : (
        <>
          <div>
            <Menu mode="inline" style={{ width: 256 }}>
              {categories.slice(1).map(({ title: main, children }) => (
                <SubMenu
                  key={main}
                  title={
                    <span>
                      <span>{main}</span>
                    </span>
                  }
                >
                  {children.map(({ title, value }) => (
                    <Menu.Item
                      icon={<AlignLeftOutlined />}
                      key={value}
                      onClick={({ key }) => fetchCategoryCourses(key)}
                    >
                      {title}
                    </Menu.Item>
                  ))}
                </SubMenu>
              ))}
            </Menu>
          </div>
          <div className="search-container">
            <TreeSelect
              style={{ width: '20%', marginRight: '10px' }}
              value={cat}
              defaultValue={0}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={categories}
              onChange={treeSelectOnChange}
              placeholder="Please select"
            />

            <Input.Search
              style={{ width: '20%' }}
              placeholder="input search text"
              onSearch={inputOnSearch}
              onChange={inputOnChange}
              enterButton
              suffix={suffix}
            />
          </div>

          <div className="topRate__container">
            {courses.length > 0 ? (
              courses.map((course) => (
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
        </>
      )}
    </div>
  );
};

HomePage.propTypes = {
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
};

export default HomePage;
