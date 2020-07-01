import React from 'react';
import { GoogleLogin } from 'react-google-login';
import propTypes from 'prop-types';

const axios = require('axios');

const successResponse = async (res, onSuccess, onFailure) => {
  const { tokenId } = res;
  try {
    const results = await axios.post('/api/v1/login/google', { tokenId });
    onSuccess(results);
  } catch ({ response }) {
    onFailure(response);
  }
};

const Login = ({ onSuccess, onFailure }) => (
  <div className="login">
    <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID}
      buttonText="Login Using Google"
      onSuccess={(res) => successResponse(res, onSuccess, onFailure)}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
      isSignedIn
    />
  </div>
);

Login.propTypes = {
  onSuccess: propTypes.func,
  onFailure: propTypes.func,
};

Login.defaultProps = {
  onSuccess: () => {},
  onFailure: () => {},
};
export default Login;
