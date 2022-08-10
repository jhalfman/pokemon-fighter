import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/pokemon">Pokemon</Link>
        <Link to="/team">Team</Link>
        <Link to="/records">Records</Link>
        <Link to="/battle">BATTLE</Link>
    </div>
  )
}

export default NavBar