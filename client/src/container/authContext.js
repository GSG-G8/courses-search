import React, { useState } from 'react';
import { notification } from 'antd';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import axios from 'axios';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({});

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

  const { signIn, loaded } = useGoogleLogin({
    clientId: process.env.REACT_APP_CLIENT_ID,
    onSuccess,
    onFailure,
    cookiePolicy: 'single_host_origin',
    isSignedIn: true,
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
