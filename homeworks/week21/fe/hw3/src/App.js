import React, { useState } from 'react';
import { Provider } from './context';
import Header from './Header';
import Article from './Article';
import './style.css';
import './normalize.css';

const App = () => {
  const [blog, setBlog] = useState({
    navbar: [
      { nav: "About" },
      { nav: "文章列表" }
    ],
    selectNav: '文章列表',
    contents: [],
    articleId: 0,
    filter: '',
  })

  const contextValue = { blog, setBlog }

  return (
    <Provider value={contextValue}>
      <div className="App">
        <Header />
        <Article />
      </div>
    </Provider>
  );
}

export default App;
