import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.less';
import * as ROUTES from '../constants/router';
import HomePage from '../container/HomePage';
import FavoritePage from '../container/FavoritePage';
import DetailsPage from '../container/DetailsPage';
import { Login } from '../components';
import Footer from '../components/common/footer';
import { AuthProvider } from '../container/authContext';
import Header from '../components/Header';
import ProtectedRoute from './protectedRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path={ROUTES.LANDING} component={HomePage} />
            <ProtectedRoute
              exact
              path={ROUTES.FAVORITEPAGE}
              component={FavoritePage}
            />
            <Route exact path={ROUTES.DETAILSPAGE} component={DetailsPage} />
            <Route exact path={ROUTES.LOGIN} component={Login} />
          </Switch>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
