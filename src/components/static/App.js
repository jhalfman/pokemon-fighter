import { useEffect, useState } from 'react';
import NavBar from '../navigation/NavBar';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import Pokemon from '../pokemon/Pokemon';
import Team from '../pokemon/Team';
import Records from '../pokemon/Records';
import Battle from "../pokemon/Battle";

function App() {
  const [spriteList, setSpriteList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [teamList, setTeamList] = useState([]);


  useEffect(() => {fetch("http://localhost:3000/pokemon")
    .then(resp => resp.json())
    .then(data => {
        const sprites = data.map(mon => {
        return <img src={mon.sprite} key={mon.name}></img>
    })
    setPokemonList(data);
    setSpriteList(sprites);
   })
   fetch("http://localhost:3000/teams")
   .then(resp => resp.json())
   .then(data => {
    setTeamList(data);
   })
}, [])
                
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<Pokemon spriteList={spriteList}/>} />
        <Route path="/team" element={<Team pokemonList={pokemonList} teamList={teamList} setTeamList={setTeamList}/>} />
        <Route path="/records" element={<Records teamList={teamList}/>} />
        <Route path="/battle" element={<Battle teamList={teamList} pokemonList={pokemonList}/>} />
      </Routes>
    </div>
  );
}

export default App;
