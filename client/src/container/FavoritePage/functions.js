/* eslint-disable no-param-reassign */
import axios from 'axios';
import { notification } from 'antd';

const errorNotification = ({ response }) => {
  const errMessage = response
    ? response.data.message
    : 'sorry, something went wrong !';
  notification.error({
    message: 'Error',
    description: errMessage || 'sorry, something went wrong !',
  });
};

// get all favorite courses for the user
export const getAllFavoriteCourses = async (
  setAllFavoriteData,
  setDisplayFavoriteData
) => {
  try {
    const { data } = await axios.get('/api/v1/favorite');
    setAllFavoriteData([...data]);
    setDisplayFavoriteData([...data]);
  } catch (err) {
    errorNotification(err);
  }
};

// set favorite folders data in DirectoryTree as required shape
export const displayTreeData = (data, setTreeData) => {
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

// get all favorite folder for the user
export const getUserFolder = async (
  setFavoriteFolders,
  setTreeData,
  setAllFavoriteData,
  setDisplayFavoriteData
) => {
  try {
    const { data } = await axios.get('/api/v1/favorite/folder');
    setFavoriteFolders([...data]);
    displayTreeData(data, setTreeData);
    getAllFavoriteCourses(setAllFavoriteData, setDisplayFavoriteData);
  } catch (err) {
    errorNotification(err);
  }
};

// add course to specific folder
export const addCourseToFolder = async (
  courseId,
  folderId,
  allFavoriteData,
  setDisplayFavoriteData,
  displayFavoriteData,
  setAllFavoriteData
) => {
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

// remove course from specific folder
export const removeCourseFromFolder = async (
  courseId,
  folderId,
  allFavoriteData,
  setDisplayFavoriteData,
  displayFavoriteData,
  setAllFavoriteData
) => {
  try {
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
  } catch (err) {
    errorNotification(err);
  }
};

// remove course from user favorite
export const removeFromFavorite = async (
  courseId,
  allFavoriteData,
  displayFavoriteData,
  setAllFavoriteData,
  setDisplayFavoriteData
) => {
  try {
    await axios.delete(`/api/v1/favorite/${courseId}`);

    const currentCourses = allFavoriteData.filter(
      (course) => course.id !== courseId
    );

    const displayCurrentCourses = displayFavoriteData.filter(
      (course) => course.id !== courseId
    );

    setAllFavoriteData(currentCourses);
    setDisplayFavoriteData(displayCurrentCourses);

    notification.success({
      message: 'Success',
      description: 'Course Removed From Favorite Successfully',
    });
  } catch (err) {
    errorNotification(err);
  }
};

// delete specific favorite folder for the user
export const deleteFolder = async (
  currentFolderId,
  favoriteFolders,
  setCurrentFolderId,
  setFavoriteFolders,
  setAllFavoriteData,
  allFavoriteData,
  setTreeData
) => {
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
    displayTreeData(updateFolders, setTreeData);
    setAllFavoriteData([...updateAllFavoriteFolders]);

    notification.success({
      message: 'Success',
      description: 'Folder Deleted Successfully',
    });
  } catch (err) {
    errorNotification(err);
  }
};

// add new favorite folder for the user
export const addNewFolder = async (
  inputValue,
  setTreeData,
  setFavoriteFolders,
  favoriteFolders,
  treeData
) => {
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

// change folder name
export const editFolder = async (
  inputValue,
  currentFolderId,
  favoriteFolders,
  treeData,
  setCurrentFolderName,
  setFavoriteFolders,
  setTreeData
) => {
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
