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
  Result,
} from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import axios from 'axios';
import categories from '../../assets/categories';
import './style.css';

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
  const [error, setError] = useState('');

  const fetchCoursesByNameAndCatId = async (catId, courseName) => {
    try {
      const { data } = await axios.post(`/api/v1/catId/courseName`, {
        catId,
        courseName,
      });
      setTopCourses(data);
      setLoading(false);
      setError('');
    } catch (err) {
      let message;
      if (err.response) {
        message = err.response.data.msg;
      } else {
        message = 'Something went wrong';
        notification.error({ message });
        setError(message);
      }
    }
  };

  const fetchTopCourses = async () => {
    try {
      const { data } = await axios.get(`/api/v1/topCourses`);
      setTopCourses(data);
      setLoading(false);
      setError('');
    } catch (err) {
      let message;
      if (err.response) {
        message = err.response.data.msg;
      } else {
        message = 'Something went wrong';
        notification.error({ message });
        setError(message);
      }
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

  return (
    <div>
      {error ? (
        <Result status="error" title="Internal server Error." />
      ) : loading ? (
        <Spin />
      ) : (
        <>
          <div className="search-container">
            <TreeSelect
              style={{ width: '20%', marginRight: '10px' }}
              // value={cat}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={categories}
              onChange={treeSelectOnChange}
              placeholder="Please select"
              treeDefaultExpandAll
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
            {topcourses.length > 0 ? (
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
        </>
      )}
    </div>
  );
};

HomePage.propTypes = {
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
};

export default HomePage;
