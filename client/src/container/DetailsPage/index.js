import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Spin,
  Rate,
  Row,
  Col,
  Alert,
  Button,
  notification,
  Divider,
  Typography,
} from 'antd';
import { addToFavorite, getCourseDetails } from './functions';
import './style.css';

const { Title, Text, Link } = Typography;

const DetailsPage = () => {
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // const [isAuth, setIsAuth] = useState(false);
  // const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getCourseDetails({
      courseId,
      setIsLoading,
      setErrorMessage,
      setCourseDetails,
      setComments,
    });
    // getAuth({ setIsAuth, setUserInfo });
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
          <Title level={2}>{title}</Title>
        </Col>
      </Row>
      <Row gutter={16} className="course-details-row">
        <Col span={8}>
          <img className="course-image" src={image} alt={title} />
        </Col>
        <Col className="gutter-row" span={16}>
          <Row>
            <Col span={6}>
              <Text strong>Reviews :</Text>
            </Col>
            <Col span={18}>{reviews}</Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text strong>Offered By :</Text>
            </Col>
            <Col span={18}>{authorName}</Col>
          </Row>

          <Row>
            <Col span={6}>
              <Text strong>Sourse :</Text>
            </Col>
            <Col span={18}>
              <Link href={url}>{source}</Link>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Text strong>Rating :</Text>
            </Col>
            <Col span={18}>
              <Rate value={Math.round(rate * 2) / 2} disabled allowHalf />
              <Text strong> {rate}</Text>
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <Text strong>Description :</Text>
            </Col>
            <Col span={18}>{description}</Col>
          </Row>
          <Row>
            <Col span={18} offset={6}>
              <Button
                type="primary"
                onClick={() => addToFavorite({ courseId, notification })}
                disabled={isLoading || errorMessage}
              >
                add to favorite
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={16} className="course-details-row">
        <Col span={24}>
          <Divider orientation="left">{`${comments.length} Comments`}</Divider>
        </Col>
      </Row>
    </>
  );
};
export default DetailsPage;
