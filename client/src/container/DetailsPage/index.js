import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Rate, Row, Col, Alert } from 'antd';
import axios from 'axios';
import './style.css';

const DetailsPage = () => {
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState({});
  //   const [comments, setComments] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchCourseDetails = async () => {
    try {
      const { data } = await axios.get(`/api/v1/courses/${courseId}`);
      setCourseDetails(data.courseDetails);
      //   setComments(data.comments);
      setIsLoading(false);
      setErrorMessage('');
    } catch ({ response }) {
      const message = response.data.message || response.data;
      setIsLoading(false);
      setErrorMessage(message);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const {
    image,
    title,
    rate,
    reviews,
    // category_id: categoryId,
    author_name: authorName,
    description,
    url,
    source,
  } = courseDetails;
  return (
    <>
      {isLoading && <Spin />}
      {errorMessage && <Alert message={errorMessage} type="error" />}
      <Row gutter={24} className="course-title">
        <h2>{title}</h2>
      </Row>
      <Row gutter={16} className="course-details">
        <Col span={8}>
          <img className="course-image" src={image} alt={title} />
        </Col>
        <Col className="gutter-row" span={16}>
          <Row>
            <Col span={6}>Reviews : </Col>
            <Col span={18}>{reviews}</Col>
          </Row>
          <Row>
            <Col span={6}>Offered By : </Col>
            <Col span={18}>{authorName}</Col>
          </Row>

          <Row>
            <Col span={6}>Sourse : </Col>
            <Col span={18}>
              <a href={url}>{source || url || 'unknown'}</a>
            </Col>
          </Row>
          <Row>
            <Col span={6}>Rating : </Col>
            <Col span={18}>
              <Rate value={Math.round(rate * 2) / 2} disabled allowHalf />
              {` (${rate})`}
            </Col>
          </Row>

          <Row>
            <Col span={6}>Description : </Col>
            <Col span={18}>{description}</Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default DetailsPage;
