import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

const Battle = ({teamList, pokemonList}) => {
    const [currentTeam, setCurrentTeam] = useState({teamName: "default"});
    const [opponentTeam, setOpponentTeam] = useState(null);
    
    const nameState = useLocation().state;
    useEffect(() => {
        if (nameState) {
            const teamSelection = teamList.find(team => team.teamName === nameState.teamName);
            setCurrentTeam(teamSelection);
        }
    }, [])
    

    function selectTeam(e) {
        if (e.target.value === "default") {
            setCurrentTeam({teamName: "default"})
        }
        else {
            const teamSelection = teamList.find(team => team.teamName === e.target.value);
            setCurrentTeam(teamSelection);
        }
    }

    function startFight() {
        let opponent1 = Math.floor(Math.random() * 151) + 1;
        let opponent2 = Math.floor(Math.random() * 151) + 1;
        while (opponent1 === opponent2) {
            opponent2 = Math.floor(Math.random() * 151) + 1;
        }
        let opponent3 = Math.floor(Math.random() * 151) + 1;
        while (opponent1 === opponent3 || opponent2 === opponent3) {
            opponent3 = Math.floor(Math.random() * 151) + 1;
        }
        const opponentPokemon1 = pokemonList.filter(pokemon => pokemon.id === opponent1);
        const opponentPokemon2 = pokemonList.filter(pokemon => pokemon.id === opponent2);
        const opponentPokemon3 = pokemonList.filter(pokemon => pokemon.id === opponent3);
        setOpponentTeam([...opponentPokemon1, ...opponentPokemon2, ...opponentPokemon3])
        
    }


  return (
    <div>
        <select name="currentTeam" id="currentTeam" onChange={selectTeam} value={currentTeam.teamName}>
            <option key="default" value="default">SELECT A TEAM</option>
            {teamList.map(team => {
                return <option key={team.id} value={team.teamName}>{team.teamName}</option>
            })}
        </select>
        {currentTeam.teamName !== "default" ? <div><img src={currentTeam.pokemon1.sprite}/><img src={currentTeam.pokemon2.sprite}/> <img src={currentTeam.pokemon3.sprite}/></div> : null}
        {currentTeam.teamName !== "default" ? <button onClick={startFight}>Start Fight</button> : null}
        <h3>Opponent Team</h3>
        {opponentTeam ? opponentTeam.map(opponent => {
            return <img src={opponent.sprite}></img>
        }) : null}
    </div>
  )
}

export default Battle