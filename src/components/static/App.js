import { useEffect, useState } from 'react';
import NavBar from '../navigation/NavBar';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import PokemonPage from '../pokemon/PokemonPage';
import Team from '../pokemon/Team';
import Records from '../pokemon/Records';
import Battle from "../pokemon/Battle";
import PokemonHighlight from '../pokemon/PokemonHighlight';


function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [teamList, setTeamList] = useState([]);


  useEffect(() => {fetch("http://localhost:3000/pokemon")
    .then(resp => resp.json())
    .then(data => {
    setPokemonList(data);
   })
   fetch("http://localhost:3000/teams")
   .then(resp => resp.json())
   .then(data => {
    setTeamList(data);
   })
}, [])

function newRecordUpdate(newTeamRecord) {
  const newTeamList = teamList.map(team => {
    if (team.teamName === newTeamRecord.teamName) {
      return newTeamRecord
    }
    else {
      return team;
    }
  })
  setTeamList([...newTeamList]);
}
                
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/" element={<PokemonPage pokemonList={pokemonList}/>}>
          <Route path=":id" element={<PokemonHighlight pokemonList={pokemonList}/>}></Route>
          <Route path="" element={<h1 style={{textAlign: "center", width: "35%"}}>Select a Pokemon</h1>}></Route>
        </Route>
        <Route path="/team" element={<Team pokemonList={pokemonList} teamList={teamList} setTeamList={setTeamList}/>} />
        <Route path="/battle" element={<Battle teamList={teamList} pokemonList={pokemonList} newRecordUpdate={newRecordUpdate}/>} />
        <Route path="/records" element={<Records teamList={teamList}/>} />
      </Routes>
    </div>
  );
}

export default App;


/*
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
} */