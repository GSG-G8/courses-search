import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import * as ROUTES from '../constants/router';
import HomePage from '../container/HomePage';
import FavoritePage from '../container/FavoritePage';
import DetailsPage from '../container/DetailsPage';

function App() {
  return (
    <div className="App">
      courses search
      <Router>
        <Switch>
          <Route exact path={ROUTES.LANDING} component={HomePage} />
          <Route exact path={ROUTES.FAVORITEPAGE} component={FavoritePage} />
          <Route exact path={ROUTES.DETAILSPAGE} component={DetailsPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
