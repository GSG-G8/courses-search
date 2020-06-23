import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import './App.css';

const axios = require('axios');

const successResponse = async (response) => {
  const { tokenId } = response;
  await axios.post('/api/v1/login/google', { tokenId });
};

const failureResponse = (response) => {
  // eslint-disable-next-line no-console
  console.log('error', response);
};

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            path="/login"
            exact
            render={() => (
              <div className="login">
                <GoogleLogin
                  clientId={process.env.REACT_APP_CLIENT_ID}
                  buttonText="Login Using Google"
                  onSuccess={successResponse}
                  onFailure={failureResponse}
                  cookiePolicy="single_host_origin"
                  isSignedIn
                />
              </div>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
