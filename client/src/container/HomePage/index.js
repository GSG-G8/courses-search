import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import {
  Button,
  Spin,
  Rate,
  TreeSelect,
  Input,
  Empty,
  Pagination,
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
  const [courses, setCourses] = useState([]);
  const [searchCourseName, setSearchCourseName] = useState('');
  const [cat, setCat] = useState(0);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchCoursesByNameAndCatId = async (catId, courseName) => {
    try {
      const { data } = await axios.post(`/api/v1/catId/courseName`, {
        catId,
        courseName,
        offset: (page - 1) * 10,
      });
      setCourses(data);
      setLoading(false);
      setError('');
      setTotal(data.count);
      setCourses(data.rows);
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
      const message =
        err.response.data.message || 'Something went wrong, try again later';
      setLoading(false);
      setError(message);
    }
  };
  const handleClick = (id) => {
    history.push(`/course/${id}`);
  };
  const treeSelectOnChange = (value) => {
    setCat(value);
  };
  const inputOnSearch = (value) => {
    setSearchCourseName(value);
  };
  const inputOnChange = (e) => {
    setSearchCourseName(e.target.value);
  };
  useEffect(() => {
    fetchTopCourses();
  }, []);
  useEffect(() => {
    fetchCoursesByNameAndCatId(cat, searchCourseName);
  }, [page, cat, searchCourseName]);
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
              value={cat}
              defaultValue={0}
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
          <Pagination
            onChange={(k) => setPage(k)}
            defaultCurrent={1}
            total={total}
            showSizeChanger={false}
          />
        </>
      )}
    </div>
  );
};

HomePage.propTypes = {
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,
};

export default HomePage;
