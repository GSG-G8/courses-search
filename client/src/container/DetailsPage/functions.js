import axios from 'axios';

export const addToFavorite = async ({ courseId, notification }) => {
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

export const getCourseDetails = async ({
  courseId,
  setIsLoading,
  setErrorMessage,
  setCourseDetails,
  setComments,
}) => {
  try {
    const { data } = await axios.get(`/api/v1/courses/${courseId}`);
    setCourseDetails(data.courseDetails);
    setComments(data.comments);
    setIsLoading(false);
    setErrorMessage('');
  } catch ({ response }) {
    const message = response.data.message || response.data;
    setIsLoading(false);
    setErrorMessage(message);
  }
};

export const getAuth = async ({ setIsAuth, setUserInfo }) => {
  try {
    const { data } = await axios.get(`/api/v1/auth`);
    setIsAuth(true);
    setUserInfo(data);
  } catch (error) {
    setIsAuth(false);
  }
};

// export const addComment = async ({ courseId }) => {
//   try {
//     const { data } = await axios.post(`/api/v1/comment/${courseId}`);
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// };
