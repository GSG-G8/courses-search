/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Input, Modal, Button, Tree } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { BsBookmarkFill } from 'react-icons/bs';
import './style.css';
import AddOrRemoveFolder from './AddOrRemoveFolder';

import {
  getUserFolder,
  removeFromFavorite,
  deleteFolder,
  addNewFolder,
  editFolder,
} from './functions';

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

  // display favorite courses for specific folder
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
    getUserFolder(
      setFavoriteFolders,
      setTreeData,
      setAllFavoriteData,
      setDisplayFavoriteData
    );
  }, []);

  useEffect(() => {
    displayDataInFolder(currentFolderId);
  }, [allFavoriteData]);

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  // add folder modal & handle
  const AddFolderModal = () => {
    setAddFolderVisible(true);
  };

  const addFolderhandleOk = () => {
    setConfirmLoading(true);
    addNewFolder(
      inputValue,
      setTreeData,
      setFavoriteFolders,
      favoriteFolders,
      treeData
    );
    setAddFolderVisible(false);
    setConfirmLoading(false);
  };

  // edit folder modal & handle
  const editFolderModal = () => {
    setEditFolderVisible(true);
  };

  const editFolderhandleOk = () => {
    setConfirmLoading(true);
    editFolder(
      inputValue,
      currentFolderId,
      favoriteFolders,
      treeData,
      setCurrentFolderName,
      setFavoriteFolders,
      setTreeData
    );
    setEditFolderVisible(false);
    setConfirmLoading(false);
  };

  // add to folder modal & handle
  const addToFolderModal = () => {
    setAddToFolderVisible(true);
  };

  const addToFolderhandleOk = () => {
    setAddToFolderVisible(false);
  };

  // handle cancel in modal
  const handleCancel = () => {
    setAddFolderVisible(false);
    setAddToFolderVisible(false);
    setEditFolderVisible(false);
  };

  // confirm delete folder
  const confirmDeleteFolder = () => {
    confirm({
      title: 'Do you Want to delete this folder?',
      icon: <ExclamationCircleOutlined />,
      content:
        'this will delete this folder and all favorite courses in this folder',
      onOk() {
        deleteFolder(
          currentFolderId,
          favoriteFolders,
          setCurrentFolderId,
          setFavoriteFolders,
          setAllFavoriteData,
          allFavoriteData,
          setTreeData
        );
      },
    });
  };

  // for DirectoryTree
  const onSelectFolder = (keys) => {
    const folderId = keys.join().split('-')[1];
    setCurrentFolderId(folderId);
    displayDataInFolder(folderId);
  };

  return (
    <div className="favorite-page">
      <Row>
        <Col
          span={4}
          offset={1}
          xl={4}
          lg={5}
          xs={22}
          style={{ backgroundColor: 'white' }}
          className="favorite-menu"
        >
          <Row>
            <Col className="favorite-menu-title" xs={24} sm={12} lg={24}>
              <h3>My Category Folders</h3>
            </Col>
            <Col className="favorite-menu-btn" xs={24} sm={12} lg={24}>
              <Button type="primary" onClick={AddFolderModal}>
                Add New Folder
              </Button>
            </Col>
          </Row>
          <DirectoryTree
            multiple
            defaultExpandAll
            defaultSelectedKeys={['0-0']}
            onSelect={onSelectFolder}
            treeData={treeData}
          />
        </Col>
        <Col
          span={19}
          xl={19}
          lg={18}
          xs={24}
          style={{ backgroundColor: 'white' }}
          className="favorite-content"
        >
          {currentFolderId ? (
            <Row className="favorite-folder-details" span={24}>
              <Col xs={24} md={5} className="folder-details-name">
                <h2>{currentFolderName}</h2>
              </Col>
              <Col xs={24} md={19} className="folder-details-action">
                <Button type="primary" onClick={addToFolderModal}>
                  Add To Folder
                </Button>
                <Button type="primary" onClick={editFolderModal}>
                  Edit Folder
                </Button>
                <Button onClick={confirmDeleteFolder}>Delete Folder</Button>
              </Col>
            </Row>
          ) : null}
          <div className="favorite-courses-container">
            {displayFavoriteData.map((course) => (
              <>
                <Row className="favorite-course">
                  <Col xs={0} md={6}>
                    <img src={course.image} alt={course.title} />
                  </Col>
                  <Col xs={24} md={18} className="favorite-course-details">
                    <span className="favorite-bookmark">
                      <Button
                        onClick={() =>
                          removeFromFavorite(
                            course.id,
                            allFavoriteData,
                            displayFavoriteData,
                            setAllFavoriteData,
                            setDisplayFavoriteData
                          )
                        }
                      >
                        <BsBookmarkFill />
                      </Button>
                    </span>
                    <Col className="favorite-title">{course.title}</Col>
                    <Col className="favorite-author">{course.author_name}</Col>
                    <Col className="favorite-author">{course.source}</Col>
                    <Col className="favorite-description">
                      {`${course.description.substring(0, 350)}`}
                      {course.description.length > 350 && (
                        <Link to={`/course/${course.id}`}>... See More</Link>
                      )}
                    </Col>
                  </Col>
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
        onOk={addFolderhandleOk}
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
            allFavoriteData={allFavoriteData}
            setDisplayFavoriteData={setDisplayFavoriteData}
            displayFavoriteData={displayFavoriteData}
            setAllFavoriteData={setAllFavoriteData}
          />
          <AddOrRemoveFolder
            data={allFavoriteData}
            folderId={currentFolderId}
            type="Remove"
            allFavoriteData={allFavoriteData}
            setDisplayFavoriteData={setDisplayFavoriteData}
            displayFavoriteData={displayFavoriteData}
            setAllFavoriteData={setAllFavoriteData}
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
    </div>
  );
};

export default FavoritePage;
