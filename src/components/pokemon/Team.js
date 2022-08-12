import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Team = ({pokemonList, teamList, setTeamList}) => {
    const [teamForm, setTeamForm] = useState({
        teamName: "",
        wins: 0,
        losses: 0,
        draws: 0,
        pokemon1: {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/",
            "id": 1,
            "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            "types": {
              "type1": "grass",
              "type2": "poison"
            },
            "hp": 100,
            "alive": true,
            "abilities": [
              "grass attack",
              "poison attack"
            ]
          },
        pokemon2: {
            "name": "charmander",
            "url": "https://pokeapi.co/api/v2/pokemon/4/",
            "id": 4,
            "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            "types": {
              "type1": "fire",
              "type2": "none"
            },
            "hp": 100,
            "alive": true,
            "abilities": [
              "fire attack",
              "normal attack"
            ]
          },
        pokemon3: {
            "name": "squirtle",
            "url": "https://pokeapi.co/api/v2/pokemon/7/",
            "id": 7,
            "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
            "types": {
              "type1": "water",
              "type2": "none"
            },
            "hp": 100,
            "alive": true,
            "abilities": [
              "water attack",
              "normal attack"
            ]
          }
    })

    function updatePokemonTeam(e) {
        if (e.target.name !== "teamName") {
            const pokeObj = pokemonList.find(pokemon => pokemon.name === e.target.value)
            setTeamForm({...teamForm, [e.target.name]: pokeObj})
        }
        else {
            setTeamForm({...teamForm, [e.target.name]: e.target.value})
        }
        
    }

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (teamForm.pokemon1.name === teamForm.pokemon2.name || teamForm.pokemon2.name === teamForm.pokemon3.name || teamForm.pokemon1.name === teamForm.pokemon3.name) {
            alert("Must have 3 unique pokemon")
            return null;
        }
        
        if (teamList.find(team => team.teamName === teamForm.teamName)) {
            alert("Team name already used")
            return null;
        }
        await fetch("http://localhost:3000/teams", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(teamForm)
        }).then(resp => resp.json())
        .then(data => {
            setTeamList([...teamList, data])
        })
        navigate("/battle", {state: {teamName: teamForm.teamName}});
    }

  return (
    <div id='teamContainer'>
        <form id="pokemonTeamForm" onSubmit={handleSubmit}>
            <div id='pokemon1'>
                <img src={teamForm.pokemon1.sprite} />
                <select name="pokemon1" id="pokemonList1" onChange={updatePokemonTeam} value={teamForm.pokemon1.name}>
                    {pokemonList.map(pokemon => {
                        return <option key={pokemon.id} value={pokemon.name}>{pokemon.id} - {pokemon.name}</option>
                    })}
                </select>
            </div>
            <div id='pokemon2'>
                <img src={teamForm.pokemon2.sprite} />   
                <select name="pokemon2" id="pokemonList2" onChange={updatePokemonTeam} value={teamForm.pokemon2.name}>
                    {pokemonList.map(pokemon => {
                        return <option key={pokemon.id} value={pokemon.name}>{pokemon.id} - {pokemon.name}</option>
                    })}
                </select>
            </div>
            <div id='pokemon3'>
                <img src={teamForm.pokemon3.sprite} />
                <select name="pokemon3" id="pokemonList3" onChange={updatePokemonTeam} value={teamForm.pokemon3.name}>
                    {pokemonList.map(pokemon => {
                        return <option key={pokemon.id} value={pokemon.name}>{pokemon.id} - {pokemon.name}</option>
                    })}
                </select>
            </div>
            <input type="text" placeholder="Enter Team Name Here..." name="teamName" value={teamForm.teamName} onChange={updatePokemonTeam}></input>
            <input type="submit" value="CONFIRM TEAM"></input>
        </form>
    </div>
  )
}

export default Team

/* 
import React from 'react'

const Team = ({team, removeFromTeam}) => {
  return (
    <div>
      <h2>CURRENT TEAM</h2>
      {team.map(mon => {
        return (
          <div>
            <img src={mon.sprite} alt="team pic" key={mon.name}></img>
            <button onClick={() => removeFromTeam(mon)}>REMOVE FROM TEAM</button>
          </div>
        )
      })}
      <button>FIGHT</button>
    </div>
  )
}

export default Team
*/

/*
import React from 'react'

const TeamForm = ({team}) => {
    console.log(team);
  return (
    <form id='teamForm'>
        <h2 style={{width: "100%", textAlign: 'center'}}>Current Team</h2>
        <label name="teamName">Enter Team Name:</label>
        <input type="text" name="teamName" id="teamNameField" placeholder='...'></input>
        <div className='teamThumbnail'>{team[0] ? <img src={team[0].sprite}/> : null}</div>
        <div className='teamThumbnail'>{team[1] ? <img src={team[1].sprite}/> : null}</div>
        <div className='teamThumbnail'>{team[2] ? <img src={team[2].sprite}/> : null}</div>
        <input type="submit" id="submitButton" value="Submit Team For Fight"></input>
    </form>
  )
}

export default TeamForm
*/