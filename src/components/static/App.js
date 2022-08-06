import { useEffect, useState } from 'react';
import NavBar from '../navigation/NavBar';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import Pokemon from '../pokemon/Pokemon';
import Team from '../pokemon/Team';
import Records from '../pokemon/Records';

function App() {

                
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/team" element={<Team />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </div>
  );
}

export default App;
