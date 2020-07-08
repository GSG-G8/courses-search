import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import propTypes from 'prop-types';
import { AuthContext } from '../container/authContext';

function ProtectedRoute({ children, exact, path, component }) {
  const { isAuth, loaded } = useContext(AuthContext);
  if (!loaded) {
    return <Spin />;
  }

  if (isAuth) {
    return (
      <Route exact={exact} path={path} component={component}>
        {children}
      </Route>
    );
  }

  return <Redirect to="/" />;
}

ProtectedRoute.propTypes = {
  exact: propTypes.bool,
  path: propTypes.string,
  component: propTypes.node,
};

ProtectedRoute.defaultProps = {
  exact: false,
  path: '/',
  component: <></>,
};

export default ProtectedRoute;
