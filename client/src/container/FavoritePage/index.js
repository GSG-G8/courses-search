import React, { useState, useEffect } from 'react';
import { Row, Col, Input, notification } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import './style.css';

const FavoritePage = () => {
  const [favoriteFolders, setFavoriteFolders] = useState([]);
  const [allFavoriteData, setAllFavoriteData] = useState([]);
  const [displayFavoriteData, setDisplayFavoriteData] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(0);
  const [currentFolderName, setCurrentFolderName] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [displayAddToFavorite, setDisplayAddToFavorite] = useState(false);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showEditFolder, setShowEditFolder] = useState(false);

  const errorNotification = ({ response }) => {
    notification.error({
      message: 'Error',
      description: response.data.message,
    });
  };

  const getAllFavoriteCourses = async () => {
    try {
      const { data } = await axios.get('/api/v1/favorite');
      setAllFavoriteData([...data]);
      setDisplayFavoriteData([...data]);
    } catch (err) {
      errorNotification(err);
    }
  };

  const getFavoriteForFolder = async () => {
    try {
      const { data } = await axios.get('/api/v1/favorite');
      setAllFavoriteData([...data]);
    } catch (err) {
      errorNotification(err);
    }
  };

  const getUserFolder = async () => {
    try {
      const { data } = await axios.get('/api/v1/favorite/folder');
      setFavoriteFolders([...data]);
      getAllFavoriteCourses();
    } catch (err) {
      errorNotification(err);
    }
  };

  const addCourse = async (courseId, folderId) => {
    try {
      await axios.post('/api/v1/favorite/add-to-folder', {
        courseId,
        folderId,
      });
      getFavoriteForFolder();
    } catch (err) {
      errorNotification(err);
    }
  };

  const removeCourse = async (courseId, folderId) => {
    await axios.delete(`/api/v1/favorite/folder/${folderId}/${courseId}`);
    getFavoriteForFolder();
  };

  const deleteFolder = async () => {
    try {
      await axios.delete(`/api/v1/favorite/folder/${currentFolderId}`);

      const updateFolders = favoriteFolders.filter(
        (folder) => folder.id !== currentFolderId
      );

      const updateAllFavoriteFolders = allFavoriteData.filter(
        (folder) => folder.folder_id !== currentFolderId
      );

      setCurrentFolderId(0);
      setFavoriteFolders([...updateFolders]);
      setAllFavoriteData([...updateAllFavoriteFolders]);
    } catch (err) {
      errorNotification(err);
    }
  };

  const addFolderName = async () => {
    try {
      if (inputValue !== '') {
        await axios.post('/api/v1/favorite/folder', {
          title: inputValue,
        });
        getUserFolder();
        setShowAddFolder(false);
      } else {
        notification.error({
          message: 'Error',
          description: 'invalid input',
        });
      }
    } catch (err) {
      errorNotification(err);
    }
  };

  const editFolder = async () => {
    try {
      if (inputValue !== '') {
        await axios.put('/api/v1/favorite/folder', {
          title: inputValue,
          folderId: currentFolderId,
        });
        getUserFolder();
        setShowEditFolder(false);
      } else {
        notification.error({
          message: 'Error',
          description: 'invalid input',
        });
      }
    } catch (err) {
      errorNotification(err);
    }
  };

  const displayDataInFolder = (folderId) => {
    if (folderId) {
      const folderCourses = allFavoriteData.filter(
        (course) => course.folder_id === folderId
      );

      const folderName = favoriteFolders.filter(
        (folder) => folder.id === folderId
      );

      const { title } = folderName[0];

      setDisplayFavoriteData([...folderCourses]);
      setCurrentFolderId(folderId);
      setCurrentFolderName(title);
    } else {
      setDisplayFavoriteData([...allFavoriteData]);
      setCurrentFolderId(0);
    }
  };

  useEffect(() => {
    getUserFolder();
  }, []);

  useEffect(() => {
    displayDataInFolder(currentFolderId);
  }, [allFavoriteData]);

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  const showOrHide = (currentCondition, setShowOrHide) => {
    currentCondition ? setShowOrHide(false) : setShowOrHide(true);
  };

  return (
    <div className="favorite-page">
      <Row className="favorite-page-header">
        <Col style={{ backgroundColor: '#7dbcea' }} span={24}>
          hello form Header
        </Col>
      </Row>
      <Row>
        <Col
          style={{ backgroundColor: '#3ba0e9', minHeight: '100vh' }}
          span={6}
        >
          <button
            type="button"
            onClick={() => showOrHide(showAddFolder, setShowAddFolder)}
          >
            Add New Folder
          </button>
          <button type="button" onClick={() => displayDataInFolder(0)}>
            display all data
          </button>
          <br />
          <br />
          {favoriteFolders.map((folder) => (
            <button
              type="button"
              onClick={() => displayDataInFolder(folder.id)}
            >
              {folder.title}
            </button>
          ))}
        </Col>
        <Col style={{ backgroundColor: 'rgba(16, 142, 233, 1)' }} span={18}>
          <>
            {currentFolderId ? currentFolderName : null}
            {currentFolderId ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    showOrHide(displayAddToFavorite, setDisplayAddToFavorite)
                  }
                >
                  Add to this folder
                </button>
                <button
                  type="button"
                  onClick={() => showOrHide(showEditFolder, setShowEditFolder)}
                >
                  Edit Folder
                </button>
                <button type="button" onClick={deleteFolder}>
                  Delete this folder
                </button>
              </>
            ) : null}
            {displayFavoriteData.map((course) => (
              <div>{course.title}</div>
            ))}
          </>
          {displayAddToFavorite ? (
            <div className="add-to-folder">
              <button
                type="button"
                onClick={() =>
                  showOrHide(displayAddToFavorite, setDisplayAddToFavorite)
                }
              >
                <CloseOutlined />
              </button>
              Display Add Panel
              {allFavoriteData.map((course) => (
                <>
                  <div>{course.title}</div>
                  <button
                    type="button"
                    onClick={() => addCourse(course.course_id, currentFolderId)}
                  >
                    Add Course
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      removeCourse(course.course_id, currentFolderId)
                    }
                  >
                    Remove Course
                  </button>
                </>
              ))}
            </div>
          ) : null}
        </Col>
      </Row>
      {showAddFolder && (
        <div className="favorite-add-folder">
          <button
            type="button"
            onClick={() => showOrHide(showAddFolder, setShowAddFolder)}
          >
            <CloseOutlined />
          </button>
          <Input onChange={onChangeInput} placeholder="Add Name" />
          <button type="button" onClick={addFolderName}>
            Add
          </button>
        </div>
      )}
      {showEditFolder && (
        <div className="favorite-add-folder">
          <button
            type="button"
            onClick={() => showOrHide(showEditFolder, setShowEditFolder)}
          >
            <CloseOutlined />
          </button>
          <Input onChange={onChangeInput} placeholder={currentFolderName} />
          <button type="button" onClick={editFolder}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
