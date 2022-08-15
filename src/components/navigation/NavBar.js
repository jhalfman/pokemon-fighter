import React from 'react';
import { NavLink as Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='navBar'>
        <Link to="/" className="link" style={({ isActive }) => ({
    background: isActive ? 'yellow' : 'rgb(170, 167, 167)',
  })}>Home</Link>
        <Link to="/pokemon" className="link" style={({ isActive }) => ({
    background: isActive ? 'yellow' : 'rgb(170, 167, 167)',
  })}>Pokemon</Link>
        <Link to="/team" className="link" style={({ isActive }) => ({
    background: isActive ? 'yellow' : 'rgb(170, 167, 167)',
  })}>Team</Link>
        <Link to="/records" className="link" style={({ isActive }) => ({
    background: isActive ? 'yellow' : 'rgb(170, 167, 167)',
  })}>Records</Link>
        <Link to="/battle" className="link" style={({ isActive }) => ({
    background: isActive ? 'yellow' : 'rgb(170, 167, 167)',
  })}>BATTLE</Link>
    </div>
  )
}

export default NavBar