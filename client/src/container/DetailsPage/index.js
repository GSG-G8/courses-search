import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Rate, Row, Col, Alert, Button, notification } from 'antd';
import axios from 'axios';
import './style.css';

const DetailsPage = () => {
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState({});
  //   const [comments, setComments] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const addToFavorite = async () => {
    try {
      const { data } = await axios.post(`/api/v1/favorite/${courseId}`);
      const message =
        data.rowCount === 1 ? 'added to favorite' : 'already in favorite';
      notification.success({ message });
    } catch ({ response }) {
      const message = response.data.message || response.data;
      notification.error({ message });
    }
  };
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
    rate = 0,
    reviews = 0,
    // category_id: categoryId,
    author_name: authorName = 'unknown',
    description,
    url,
    source = 'unknown',
  } = courseDetails;
  return (
    <>
      {isLoading && <Spin />}
      {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
      <Row gutter={16} className="course-details-row">
        <Col span={24}>
          <h2>{title}</h2>
        </Col>
      </Row>
      <Row gutter={16} className="course-details-row">
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
              <a href={url}>{source}</a>
            </Col>
          </Row>
          <Row>
            <Col span={6}>Rating : </Col>
            <Col span={18}>
              <Rate value={Math.round(rate * 2) / 2} disabled allowHalf />
              {` ${rate}`}
            </Col>
          </Row>

          <Row>
            <Col span={6}>Description : </Col>
            <Col span={18}>{description}</Col>
          </Row>
          <Row>
            <Col span={18} offset={6}>
              <Button
                type="primary"
                onClick={addToFavorite}
                disabled={isLoading || errorMessage}
              >
                add to favorite
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default DetailsPage;
