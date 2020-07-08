import React, { useState, useEffect, useRef } from 'react';
import {
  Spin,
  Rate,
  TreeSelect,
  Input,
  Empty,
  Result,
  Pagination,
  Row,
  Col,
} from 'antd';
import propTypes from 'prop-types';
import axios from 'axios';
import categories from '../../assets/categories';
import { mainImg } from '../../assets/images';

import './style.css';

const HomePage = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [searchCourseName, setSearchCourseName] = useState('');
  const [cat, setCat] = useState(0);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const searchRef = useRef(null);

  const fetchCoursesByNameAndCatId = async (catId, courseName) => {
    try {
      const { data } = await axios.post(`/api/v1/catId/courseName`, {
        catId,
        courseName,
        offset: (page - 1) * 12,
      });
      setLoading(false);
      setError('');
      setTotal(data.count);
      setCourses(data.rows);
    } catch (err) {
      const message = err.response
        ? err.response.data.message
        : 'sorry, something went wrong , try again later !';

      setLoading(false);
      setError(message);
    }
  };

  const handleClick = (id) => {
    history.push(`/course/${id}`);
  };
  const treeSelectOnChange = (value) => {
    setCat(value);
    setPage(1);
  };
  const inputOnSearch = (value) => {
    setSearchCourseName(value);
    setPage(1);
    if (searchRef.current) {
      searchRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };
  const inputOnChange = (e) => {
    setSearchCourseName(e.target.value);
    setPage(1);
    if (searchRef.current) {
      searchRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (!error) fetchCoursesByNameAndCatId(cat, searchCourseName);
  }, [page, cat, searchCourseName]);

  return (
    <div>
      {error ? (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
        />
      ) : loading ? (
        <Spin />
      ) : (
        <>
          <Row>
            <Col xs={{ span: 24, order: 2 }} md={{ span: 12, order: 1 }}>
              <div className="search-container">
                <Row>
                  <Col span={22} offset={2}>
                    <p className="main-p">
                      Find the best courses, tutorials, and learning paths.
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col span={22} offset={2}>
                    <Input.Group>
                      <div className="main-searchinput">
                        <TreeSelect
                          style={{ width: '35%', marginRight: '10px' }}
                          value={cat}
                          defaultValue={0}
                          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                          treeData={categories}
                          onChange={treeSelectOnChange}
                          placeholder="Please select"
                        />

                        <Input.Search
                          style={{ width: '40%' }}
                          placeholder="input search text"
                          onSearch={inputOnSearch}
                          onChange={inputOnChange}
                          enterButton
                        />
                      </div>
                    </Input.Group>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col xs={{ span: 24, order: 1 }} md={{ span: 12, order: 2 }}>
              <img className="main-img" src={mainImg} alt="img" />
            </Col>
          </Row>
          <div className="container" ref={searchRef}>
            <div className="topRate__container">
              {courses.length > 0 ? (
                <Row gutter={40}>
                  {courses.map((course) => (
                    <Col xs={24} sm={12} md={8} lg={6}>
                      {' '}
                      <div className="topRate__course-card" key={course.id}>
                        <div className="topRate__course-card__image__container">
                          <div
                            className="topRate__course-card__image"
                            style={{
                              width: '100%',
                              paddingTop: '70%',
                              backgroundImage: `url("${course.image}")`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              // borderTopRightRadius: '50%',
                            }}
                            role="button"
                            aria-label="view details"
                            onClick={() => handleClick(course.id)}
                            onKeyDown={() => handleClick(course.id)}
                            tabIndex={0}
                          />
                        </div>
                        <div className="topRate__course-card__contant">
                          <h2>{course.title}</h2>
                          <h3>{course.source}</h3>

                          {course.rate && (
                            // <StarOutlined style={{ fill: 'red' }} />
                            <span className="topRate__course-card__contant__span">
                              <Rate
                                allowClear={false}
                                value={Math.round(course.rate * 2) / 2}
                                Rate
                                disabled
                                allowHalf
                              />
                            </span>
                          )}
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Empty />
              )}
              <Pagination
                current={page}
                onChange={setPage}
                pageSize={12}
                total={total}
                showSizeChanger={false}
              />
            </div>
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
