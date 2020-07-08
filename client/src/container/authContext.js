import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import axios from 'axios';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [loaded, setLoaded] = useState(false);

  const getAuth = async () => {
    try {
      const { data } = await axios.get(`/api/v1/auth`);
      const [givenName, familyName] = data.name.split(' ');
      setUserInfo({
        ...data,
        givenName,
        familyName,
        imageUrl: data.picture,
      });
      setIsAuth(true);
      setLoaded(true);
    } catch (error) {
      setLoaded(true);
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  const onSuccess = async ({ tokenId, profileObj }) => {
    try {
      await axios.post('/api/v1/login/google', { tokenId });
      setIsAuth(true);
      setUserInfo(profileObj);
    } catch {
      notification.error({ message: 'failed to login' });
    }
  };

  const onFailure = () => {
    notification.error({ message: 'failed to login' });
  };

  const onLogoutSuccess = async () => {
    try {
      await axios.get('/api/v1/logout');
      setIsAuth(false);
    } catch (error) {
      notification.error({ message: 'something went wrong !' });
    }
  };

  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_CLIENT_ID,
    onSuccess,
    onFailure,
    cookiePolicy: 'single_host_origin',
  });

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_CLIENT_ID,
    cookiePolicy: 'single_host_origin',
    onLogoutSuccess,
  });

  return (
    <div>
      <AuthContext.Provider
        value={{ isAuth, userInfo, signOut, signIn, loaded }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
}

export { AuthContext, AuthProvider };
