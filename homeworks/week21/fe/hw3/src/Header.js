import React, { useContext } from 'react';
import context from './context';
import Navbar from './Navbar';

const Header = () => {
  const { blog, setBlog } = useContext(context);
  const { navbar, selectNav, articleId, filter } = blog;

  const handleFilter = e => {
    setBlog({ ...blog, filter: e.target.value })
  }

  return (
    <header className="navbar-wrapper">
      <ul className="navbar">
        { navbar.map(({ nav }) => <Navbar key={ nav }>{ nav }</Navbar>) }
      </ul>
      { 
        selectNav === '文章列表' && !articleId 
        ? <label className="navbar-search" htmlFor="search-filter">搜尋：
            <input value={ filter } id="search-filter" onChange={ handleFilter }/>
          </label>
        : null
      }
    </header>
  );
}

export default Header;