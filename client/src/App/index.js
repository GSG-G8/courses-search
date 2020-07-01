import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import * as ROUTES from '../constants/router';
import HomePage from '../container/HomePage';
import FavoritePage from '../container/FavoritePage';
import DetailsPage from '../container/DetailsPage';
import { Login } from '../components';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={ROUTES.LANDING} component={HomePage} />
          <Route exact path={ROUTES.FAVORITEPAGE} component={FavoritePage} />
          <Route exact path={ROUTES.DETAILSPAGE} component={DetailsPage} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
