import { useEffect, useState } from 'react';
import NavBar from './components/navigation/NavBar';
import Home from './components/static/Home';
import { Routes, Route } from 'react-router-dom';
import Pokemon from './components/pokemon/Pokemon';

function App() {
const [spriteList, setSpriteList] = useState([])

  useEffect(() => {fetch("http://localhost:3000/pokemon")
  .then(resp => resp.json())
  .then(data => {
    const sprites = data.map(mon => {
      return <img src={mon.sprite}></img>
    })
    setSpriteList(sprites);
  })}, [])
                
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
