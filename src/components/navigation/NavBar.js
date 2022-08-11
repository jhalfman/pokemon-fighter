import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='navBar'>
        <Link to="/" className='link'>Home</Link>
        <Link to="/pokemon" className='link'>Pokemon</Link>
        <Link to="/team" className='link'>Team</Link>
        <Link to="/records" className='link'>Records</Link>
    </div>
  )
}

export default NavBar