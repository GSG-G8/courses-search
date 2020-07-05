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
  Tag,
  Popconfirm,
} from 'antd';

import { FaBookmark, FaComment, FaTrash } from 'react-icons/fa';
import {
  addToFavorite,
  getCourseDetails,
  addComment,
  deleteComment,
} from './functions';

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
const { Title, Text, Link, Paragraph } = Typography;

const DetailsPage = ({ match }) => {
  const { courseId } = match.params;
  const [isLoading, setIsLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const { isAuth, userInfo } = useContext(AuthContext);

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

  if (errorMessage || isLoading) {
    return (
      <Row gutter={32} className="cdetails-page">
        <Col span={24}>
          {errorMessage ? (
            <Alert message={errorMessage} type="error" showIcon />
          ) : (
            <Spin>
              <Alert message="Loading ..." type="info" />
            </Spin>
          )}
        </Col>
      </Row>
    );
  }

  return (
    <div className="details-page">
      <Row gutter={32}>
        <Col xs={24} md={10}>
          <img className="course-image" src={image} alt={title} />
        </Col>
        <Col xs={24} md={14}>
          <Row>
            <Col span={24}>
              <Title level={2}>{title}</Title>
              <Text strong type="secondary">
                {`By: ${authorName}`}
              </Text>
            </Col>
            <Col span={24}>
              <Text strong type="secondary">
                <Link href={url} target="_blank">
                  {`Go to website (${source})`}
                </Link>
              </Text>
            </Col>
            <Col span={24} className="normal-font">
              <Rate value={Math.round(rate * 2) / 2} disabled allowHalf />
              <Text strong> {Math.round(rate * 10) / 10}</Text>
              <Text strong> {`(${+reviews})`}</Text>
            </Col>
            <Col span={24}>
              <Tag color="blue">{subCategory[categoryId]}</Tag>
            </Col>
            <Col span={24}>
              <Paragraph
                ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}
              >
                <br />
                {description}
              </Paragraph>
            </Col>
            <Col span={24}>
              <Button
                type="primary"
                onClick={() => {
                  if (isAuth) addToFavorite(allStates);
                  else
                    notification.warn({ message: 'you need to login first !' });
                }}
                disabled={isLoading}
              >
                <FaBookmark />
                <span className="margin-left">add to favorite</span>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Divider
            className="normal-font"
            orientation="left"
            style={{ marginTop: '32px' }}
          >{`${comments.length} Comments`}</Divider>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={4} md={3} lg={2}>
          <img
            className="user-image"
            src={userInfo.imageUrl || defaultUserPhoto}
            alt="user"
          />
        </Col>
        <Col xs={20} md={21} lg={22}>
          <TextArea
            style={{ width: '100%' }}
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
              else notification.warn({ message: 'you need to login first' });
            }}
            disabled={isPosting}
          >
            <FaComment />
            <span className="margin-left">add your comment</span>
          </Button>
        </Col>
      </Row>

      {comments.map(({ name, content, comment_id: commentId, picture }) => (
        <Row gutter={16} key={commentId}>
          <Col xs={4} md={3} lg={2}>
            <img
              className="user-image"
              src={picture || defaultUserPhoto}
              alt="user"
            />
          </Col>
          <Col xs={20} md={21} lg={22}>
            <strong>{`by (${name})`}</strong>
            {userInfo.imageUrl === picture && (
              <Popconfirm
                title="Are you sure delete this comment ?"
                onConfirm={() => {
                  deleteComment({
                    commentId,
                    comments,
                    setComments,
                    notification,
                  });
                }}
                okText="Delete"
                okType="danger"
              >
                <Button danger type="link">
                  <FaTrash />
                  <span className="margin-left">delete</span>
                </Button>
              </Popconfirm>
            )}

            <p>{content}</p>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default DetailsPage;
