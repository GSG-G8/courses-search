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
  Input,
} from 'antd';
import {
  addToFavorite,
  getCourseDetails,
  getAuth,
  addComment,
} from './functions';
import './style.css';

import userImage from './defaultUser.png';

const { TextArea } = Input;
const { Title, Text, Link } = Typography;

const DetailsPage = () => {
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [newComment, setNewComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    getCourseDetails({
      courseId,
      setIsLoading,
      setErrorMessage,
      setCourseDetails,
      setComments,
    });
    getAuth({ setIsAuth, setUserInfo });
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
      {isLoading && (
        <Row className="course-details-row">
          <Col span={24}>
            <Spin>
              <Alert message="Loading ..." type="info" />
            </Spin>
          </Col>
        </Row>
      )}
      {errorMessage && (
        <Row className="course-details-row">
          <Col span={24}>
            <Alert message={errorMessage} type="error" showIcon />
          </Col>
        </Row>
      )}
      <Row className="course-details-row">
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
          <Row gutter={16} className="course-details-row">
            <Col span={24}>
              <Divider orientation="center">{`${comments.length} Comments`}</Divider>
            </Col>
          </Row>
          {comments.map(({ name, content }) => (
            <Row gutter={16}>
              <Col span={3}>
                <img className="user-image" src={userImage} alt="user" />
              </Col>
              <Col span={21}>
                <strong>{`by (${name})`}</strong>
                <p>{content}</p>
              </Col>
            </Row>
          ))}

          {isAuth ? (
            <Row gutter={16}>
              <Col span={3}>
                <img className="user-image" src={userImage} alt="user" />
              </Col>
              <Col span={21}>
                <TextArea
                  onChange={({ target }) => setNewComment(target.value)}
                  autoSize={{ minRows: 3, maxRows: 6 }}
                  value={newComment}
                  maxLength={255}
                  disabled={isPosting}
                />
                <Button
                  type="primary"
                  style={{ margin: '16px 0' }}
                  onClick={() => {
                    addComment({
                      courseId,
                      content: newComment,
                      setIsPosting,
                      comments,
                      name: userInfo.name,
                      setComments,
                    });
                  }}
                  disabled={isPosting}
                >
                  add your comment
                </Button>
              </Col>
            </Row>
          ) : (
            <Alert description="Login to add comments" type="info" />
          )}
        </Col>
      </Row>
    </>
  );
};
export default DetailsPage;
