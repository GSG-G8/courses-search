import React, { useState } from 'react';
import { Modal } from 'antd';
import { useGoogleLogout } from 'react-google-login';
import { Login } from '../components';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_CLIENT_ID,
    cookiePolicy: 'single_host_origin',
    onLogoutSuccess: () => {
      setIsAuth(false);
      setShowModal(false);
    },
  });

  const showLoginModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <AuthContext.Provider
        value={{ isAuth, userInfo, showLoginModal, signOut }}
      >
        {children}
      </AuthContext.Provider>

      <Modal
        title="Login"
        forceRender
        visible={showModal}
        onOk={() => {
          setShowModal(false);
        }}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <p>login to save your favorite courses and add comments</p>
        <Login
          onSuccess={(profileObj) => {
            setIsAuth(true);
            setShowModal(false);
            setUserInfo(profileObj);
          }}
        />
      </Modal>
    </div>
  );
}

export { AuthContext, AuthProvider };
