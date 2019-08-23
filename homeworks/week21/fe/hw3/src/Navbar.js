import React, { useContext } from 'react';
import context from './context';

const Navbar = (props) => {
  const { blog, setBlog } = useContext(context);

  const setSelectNav = (nav) => {
    setBlog({ ...blog, selectNav: nav })
  }

  return (
    <li className="navbar-menu" onClick={ () => setSelectNav(`${props.children}`) }>
      { props.children }
    </li>
  );
}

export default Navbar;