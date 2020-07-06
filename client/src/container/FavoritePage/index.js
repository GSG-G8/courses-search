/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { Row, Col, Input, notification, Modal, Button, Tree } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { BsBookmarkFill } from 'react-icons/bs';
import axios from 'axios';
import './style.css';
import AddOrRemoveFolder from './AddOrRemoveFolder';

const { confirm } = Modal;
const { DirectoryTree } = Tree;

const FavoritePage = () => {
  const [favoriteFolders, setFavoriteFolders] = useState([]);
  const [allFavoriteData, setAllFavoriteData] = useState([]);
  const [displayFavoriteData, setDisplayFavoriteData] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(0);
  const [currentFolderName, setCurrentFolderName] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const [addFolderVisible, setAddFolderVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [addToFolderVisible, setAddToFolderVisible] = useState(false);
  const [editFolderVisible, setEditFolderVisible] = useState(false);

  const [treeData, setTreeData] = useState([
    {
      title: 'All',
      key: '0-0',
    },
  ]);

  const errorNotification = ({ response }) => {
    const errMessage = response
      ? response.data.message
      : 'sorry, something went wrong !';
    notification.error({
      message: 'Error',
      description: errMessage || 'sorry, something went wrong !',
    });
  };

  const getFavoriteForFolder = async () => {
    try {
      const { data } = await axios.get('/api/v1/favorite');
      setAllFavoriteData([...data]);
      return data;
    } catch (err) {
      return errorNotification(err);
    }
  };

  const getAllFavoriteCourses = async () => {
    const data = await getFavoriteForFolder();
    setDisplayFavoriteData([...data]);
  };

  const displayTreeData = (data) => {
    const arr = [];
    data.forEach(({ id, title }) =>
      arr.push({
        title,
        key: `0-${id}`,
      })
    );
    setTreeData([
      {
        title: 'All',
        key: '0-0',
      },
      ...arr,
    ]);
  };

  const getUserFolder = async () => {
    try {
      const { data } = await axios.get('/api/v1/favorite/folder');
      setFavoriteFolders([...data]);
      displayTreeData(data);
      getAllFavoriteCourses();
    } catch (err) {
      errorNotification(err);
    }
  };

  // finish
  const addCourse = async (courseId, folderId) => {
    try {
      await axios.post('/api/v1/favorite/add-to-folder', {
        courseId,
        folderId,
      });

      const currentCourses = allFavoriteData;

      currentCourses.forEach((course) => {
        if (course.id === Number(courseId)) {
          course.folder_id = Number(folderId);
          setDisplayFavoriteData([...displayFavoriteData, course]);
        }
      });

      setAllFavoriteData(currentCourses);

      notification.success({
        message: 'Success',
        description: 'Course Added To Folder Successfully',
      });
    } catch (err) {
      errorNotification(err);
    }
  };

  // finish
  const removeCourse = async (courseId, folderId) => {
    await axios.delete(`/api/v1/favorite/folder/${folderId}/${courseId}`);

    const currentCourses = allFavoriteData;

    const displayCurrentCourses = displayFavoriteData.filter(
      (course) => course.id !== courseId
    );

    currentCourses.forEach((course) => {
      if (course.id === Number(courseId)) {
        course.folder_id = null;
      }
    });

    setAllFavoriteData(currentCourses);
    setDisplayFavoriteData(displayCurrentCourses);

    notification.success({
      message: 'Success',
      description: 'Course Removed From Folder Successfully',
    });
  };

  // finish
  const deleteFolder = async () => {
    try {
      await axios.delete(`/api/v1/favorite/folder/${currentFolderId}`);

      const updateFolders = favoriteFolders.filter(
        (folder) => folder.id !== Number(currentFolderId)
      );

      const updateAllFavoriteFolders = allFavoriteData.filter(
        (folder) => folder.folder_id !== Number(currentFolderId)
      );

      setCurrentFolderId(0);
      setFavoriteFolders([...updateFolders]);
      displayTreeData(updateFolders);
      setAllFavoriteData([...updateAllFavoriteFolders]);

      notification.success({
        message: 'Success',
        description: 'Folder Deleted Successfully',
      });
    } catch (err) {
      errorNotification(err);
    }
  };

  // finish
  const addNewFolder = async () => {
    try {
      if (inputValue !== '') {
        const {
          data: { rows },
        } = await axios.post('/api/v1/favorite/folder', {
          title: inputValue,
        });
        const { id } = rows[0];
        setTreeData([...treeData, { title: inputValue, key: `0-${id}` }]);
        setFavoriteFolders([...favoriteFolders, { id, title: inputValue }]);
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

  // finish
  const editFolder = async () => {
    try {
      if (inputValue !== '') {
        await axios.put('/api/v1/favorite/folder', {
          title: inputValue,
          folderId: currentFolderId,
        });

        const editedFolders = favoriteFolders;
        const editedTree = treeData;

        editedFolders.forEach((folder) => {
          if (folder.id === Number(currentFolderId)) {
            folder.title = inputValue;
          }
        });

        editedTree.forEach((folder) => {
          const folderId = folder.key.split('-')[1];
          if (folderId === currentFolderId) {
            folder.title = inputValue;
          }
        });

        setCurrentFolderName(inputValue);
        setFavoriteFolders([...editedFolders]);
        setTreeData([...editedTree]);
        notification.success({
          message: 'Success',
          description: 'Folder Name Updated Successfully',
        });
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

  // finish
  const displayDataInFolder = (folderId) => {
    const folderIdInt = Number(folderId);
    if (folderIdInt) {
      const folderCourses = allFavoriteData.filter(
        (course) => course.folder_id === folderIdInt
      );

      const folderName = favoriteFolders.filter(
        (folder) => folder.id === folderIdInt
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

  // add new folder modal
  const showModal = () => {
    setAddFolderVisible(true);
  };

  const addNewFolderhandleOk = async () => {
    setConfirmLoading(true);
    addNewFolder();
    setAddFolderVisible(false);
    setConfirmLoading(false);
  };

  const editFolderhandleOk = async () => {
    setConfirmLoading(true);
    editFolder();
    setEditFolderVisible(false);
    setConfirmLoading(false);
  };

  const addToFolderhandleOk = () => {
    setAddToFolderVisible(false);
  };

  const handleCancel = () => {
    setAddFolderVisible(false);
    setAddToFolderVisible(false);
    setEditFolderVisible(false);
  };

  // add to folder modal
  const addToFolderModal = () => {
    setAddToFolderVisible(true);
  };

  // edit folder modal
  const editToFolderModal = () => {
    setEditFolderVisible(true);
  };

  // confirm delete
  const showConfirm = async () => {
    confirm({
      title: 'Do you Want to delete this folder?',
      icon: <ExclamationCircleOutlined />,
      content:
        'this will delete this folder and all favorite courses in this folder',
      onOk() {
        deleteFolder();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // tree

  const onSelect = (keys) => {
    const folderId = keys.join().split('-')[1];
    setCurrentFolderId(folderId);
    displayDataInFolder(folderId);
  };

  return (
    <div className="favorite-page">
      <Row className="favorite-page-header">
        <Col span={24}>Header</Col>
      </Row>
      <Row>
        <Col
          span={4}
          style={{ backgroundColor: 'white' }}
          className="favorite-menu"
        >
          <h3>My Category Folders</h3>
          <Button type="primary" onClick={showModal}>
            Add New Folder
          </Button>

          <DirectoryTree
            multiple
            defaultExpandAll
            defaultSelectedKeys={['0-0']}
            onSelect={onSelect}
            treeData={treeData}
          />
        </Col>
        <Col
          span={20}
          style={{ backgroundColor: 'white' }}
          className="favorite-content"
        >
          {currentFolderId ? (
            <Row className="favorite-folder-details" span={24}>
              <Col span={15} className="folder-details-name">
                <h2>{currentFolderName}</h2>
              </Col>
              <Col span={9} className="folder-details-action">
                <Button type="primary" onClick={addToFolderModal}>
                  Add To This Folder
                </Button>
                <Button type="primary" onClick={editToFolderModal}>
                  Edit Folder
                </Button>
                <Button onClick={showConfirm}>Delete Folder</Button>
              </Col>
            </Row>
          ) : null}
          <div className="favorite-courses-container">
            {displayFavoriteData.map((course) => (
              <>
                <Row className="favorite-course">
                  <Col>
                    <img src={course.image} alt={course.title} />
                  </Col>
                  <div className="favorite-course-details">
                    <span className="favorite-bookmark">
                      <BsBookmarkFill />
                    </span>
                    <Col className="favorite-title">{course.title}</Col>
                    <Col className="favorite-author">{course.author_name}</Col>
                    <Col className="favorite-author">{course.source}</Col>
                    <Col className="favorite-description">
                      {course.description}
                    </Col>
                  </div>
                </Row>
                <div className="line-div" />
              </>
            ))}
          </div>
        </Col>
      </Row>
      <Modal
        title="Add New Folder"
        visible={addFolderVisible}
        onOk={addNewFolderhandleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input onChange={onChangeInput} placeholder="Add Name" />
      </Modal>

      <Modal
        title="Add/Remove Folder"
        visible={addToFolderVisible}
        onOk={addToFolderhandleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <>
          <AddOrRemoveFolder
            data={allFavoriteData}
            folderId={currentFolderId}
            type="Add"
            addOrRemoveFun={addCourse}
          />
          <AddOrRemoveFolder
            data={allFavoriteData}
            folderId={currentFolderId}
            type="Remove"
            addOrRemoveFun={removeCourse}
          />
        </>
      </Modal>

      <Modal
        title="Edit Folder Name"
        visible={editFolderVisible}
        onOk={editFolderhandleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input onChange={onChangeInput} placeholder="update folder name" />
      </Modal>

      <div className="favorite-page-menu-btn" />
    </div>
  );
};

export default FavoritePage;
