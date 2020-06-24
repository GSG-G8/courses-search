import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../container/HomePage';
import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <Router>
        <HomePage />
      </Router>
    </div>
  );
}

export default App;
