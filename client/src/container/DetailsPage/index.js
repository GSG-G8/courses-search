import React, { useState, useEffect, useContext } from 'react';

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

import { addToFavorite, getCourseDetails, addComment } from './functions';

import './style.css';
import categories from '../../assets/categories';
import { defaultUserPhoto } from '../../assets/images';
import { AuthContext } from '../authContext';

const subCategory = {};
categories.forEach(({ children }) => {
  if (children)
    children.forEach(({ title, value }) => {
      subCategory[value] = title;
    });
});

const { TextArea } = Input;
const { Title, Text, Link } = Typography;

const DetailsPage = ({ match }) => {
  const { courseId } = match.params;
  const [isLoading, setIsLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const { isAuth, userInfo, showLoginModal, signOut } = useContext(AuthContext);

  const allStates = {
    courseId,
    notification,
    setIsLoading,
    setErrorMessage,
    setCourseDetails,
    setComments,
    content: newComment,
    setIsPosting,
    comments,
    userInfo,
    setNewComment,
  };

  useEffect(() => {
    getCourseDetails(allStates);
  }, []);

  const {
    image,
    title,
    rate = 0,
    reviews = 0,
    category_id: categoryId,
    author_name: authorName = 'unknown',
    description,
    url,
    source = 'unknown',
  } = courseDetails;

  if (errorMessage) {
    return (
      <Row className="course-details-row">
        <Col span={24}>
          <Alert message={errorMessage} type="error" showIcon />
        </Col>
      </Row>
    );
  }

  if (isLoading) {
    return (
      <Row className="course-details-row">
        <Col span={24}>
          <Spin>
            <Alert message="Loading ..." type="info" />
          </Spin>
        </Col>
      </Row>
    );
  }

  return (
    <>
      {isAuth ? (
        <div>
          <span>{userInfo.name}</span>
          <Button type="primary" onClick={signOut}>
            logout
          </Button>{' '}
        </div>
      ) : (
        <Button type="primary" onClick={showLoginModal}>
          login
        </Button>
      )}
      <Row className="course-details-row">
        <Col span={24}>
          <Title level={2}>{title}</Title>
        </Col>
      </Row>
      <Row gutter={16} className="course-details-row">
        <Col sm={24} md={8}>
          <img className="course-image" src={image} alt={title} />
        </Col>
        <Col className="gutter-row" sm={24} md={16}>
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
              <Text strong>Category :</Text>
            </Col>
            <Col xs={24} sm={18}>
              {subCategory[categoryId]}
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
            <Col xs={24} sm={18}>
              {description}
            </Col>
          </Row>
          <Row>
            <Col span={18} offset={6}>
              <Button
                type="primary"
                onClick={() => {
                  if (isAuth) addToFavorite(allStates);
                  else showLoginModal(true);
                }}
                disabled={isLoading}
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

          {comments.map(({ name, content, comment_id: commentId, picture }) => (
            <Row gutter={16} key={commentId}>
              <Col span={3}>
                <img
                  className="user-image"
                  src={picture || defaultUserPhoto}
                  alt="user"
                />
              </Col>
              <Col span={21}>
                <strong>{`by (${name})`}</strong>
                <p>{content}</p>
              </Col>
            </Row>
          ))}

          <Row gutter={16}>
            <Col span={3}>
              <img
                className="user-image"
                src={userInfo.imageUrl || defaultUserPhoto}
                alt="user"
              />
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
                  if (isAuth) addComment(allStates);
                  else showLoginModal(true);
                }}
                disabled={isPosting}
              >
                add your comment
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default DetailsPage;
