import { useEffect, useState } from 'react';
import NavBar from '../navigation/NavBar';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import PokemonPage from '../pokemon/PokemonPage';
import Team from '../pokemon/Team';
import Records from '../pokemon/Records';

function App() {
  const [team, setTeam] = useState([]);

  function addToTeam(pokemon) {
    if (team.length > 2) {
      console.log(team);
      console.log("Only 3 pokemon allowed on a team!")
    }
    else if (team.find(member => member.name === pokemon.name)) {
      console.log(team);
      console.log("Can't add pokemon twice!");
    }
    else {
      console.log(pokemon.name + " added to team!")
      setTeam([...team, pokemon])
    }
  }

  function removeFromTeam(pokemon) {
    const updatedTeam = team.filter(member => member.name !== pokemon.name);
    setTeam(updatedTeam);
  }
                
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<PokemonPage addToTeam={addToTeam} team={team}/>} />
        <Route path="/team" element={<Team team={team} removeFromTeam={removeFromTeam}/>} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </div>
  );
}

export default App;
