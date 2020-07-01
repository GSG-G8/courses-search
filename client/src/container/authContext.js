import React, { useState } from 'react';
import { Modal } from 'antd';

import { Login } from '../components';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [showModal, setShowModal] = useState(false);

  const showLoginModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <AuthContext.Provider value={{ isAuth, userInfo, showLoginModal }}>
        {children}
      </AuthContext.Provider>

      <Modal
        title="Login"
        forceRender
        visible={showModal && !isAuth}
        onOk={() => {
          setShowModal(false);
        }}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <p>login to save your favorite courses and add comments</p>
        <Login
          onSuccess={({ data }) => {
            setIsAuth(true);
            setUserInfo(data);
          }}
        />
      </Modal>
    </div>
  );
}

export { AuthContext, AuthProvider };
