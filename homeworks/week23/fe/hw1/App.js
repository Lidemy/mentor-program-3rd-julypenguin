import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Header from './HeaderContainer';
import Article from './Article';
import './style.css';
import './normalize.css';

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <Article />
    </div>
  </Router>
);

export default App;
