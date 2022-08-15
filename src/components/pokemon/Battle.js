import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

const Battle = ({teamList, pokemonList}) => {
    const [currentTeam, setCurrentTeam] = useState({teamName: "default"});
    const [opponentTeam, setOpponentTeam] = useState(null);
    const [currentFighter, setCurrentFighter] = useState(null);
    const [opponentFighter, setOpponentFighter] = useState(null);
    
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

    function opponentSelection() {
        let randomOpp =  Math.floor(Math.random() * 3) + 1;
        setOpponentFighter(opponentTeam[randomOpp]);
    }

    function attack(fighter, attackNumber) {
        console.log(fighter.abilities[attackNumber])
    }


    let teamSelectionDiv;
    if (currentTeam.teamName !== "default") {
        teamSelectionDiv = (
            <>
                <select name="currentTeam" id="currentTeam" onChange={selectTeam} value={currentTeam.teamName}>
                    <option key="default" value="default">SELECT A TEAM</option>
                    {teamList.map(team => {
                        return <option key={team.id} value={team.teamName}>{team.teamName}</option>
                    })}
                </select>
                <img src={currentTeam.pokemon1.sprite}/>
                <img src={currentTeam.pokemon2.sprite}/>
                <img src={currentTeam.pokemon3.sprite}/>
                <button onClick={startFight}>Start Fight</button>
            </>
        )
    }
    else {
        teamSelectionDiv = (
            <>
                <select name="currentTeam" id="currentTeam" onChange={selectTeam} value={currentTeam.teamName}>
                    <option key="default" value="default">SELECT A TEAM</option>
                    {teamList.map(team => {
                        return <option key={team.id} value={team.teamName}>{team.teamName}</option>
                    })}
                </select>
            </>
        )
    }
        
    
    let battleDiv;
    if (opponentTeam) {
        const opponentTeamDisplay = opponentTeam.map(opponent => {
            return (
                <div key={opponent.id}>
                    <h4>{opponent.name} - {opponent.alive ? (opponent.hp + "hp") : "Dead"}</h4>
                    <img src={opponent.sprite}></img>
                </div>
            )
        })
        const userTeamDisplay = (
            <>
                <div onClick={() => {setCurrentFighter(currentTeam.pokemon1); opponentSelection()}}>
                    <h4>{currentTeam.pokemon1.name} - {currentTeam.pokemon1.alive ? (currentTeam.pokemon1.hp + " hp"): "Dead"}</h4>
                    <img src={currentTeam.pokemon1.sprite} />
                </div>
                <div onClick={() => {setCurrentFighter(currentTeam.pokemon2); opponentSelection()}}>
                <h4>{currentTeam.pokemon2.name} - {currentTeam.pokemon2.alive ? (currentTeam.pokemon2.hp + " hp"): "Dead"}</h4>
                    <img src={currentTeam.pokemon2.sprite} />
                </div>
                <div onClick={() => {setCurrentFighter(currentTeam.pokemon3); opponentSelection()}}>
                <h4>{currentTeam.pokemon3.name} - {currentTeam.pokemon3.alive ? (currentTeam.pokemon3.hp + " hp"): "Dead"}</h4>
                    <img src={currentTeam.pokemon3.sprite} />
                </div>
            </>
        )
        battleDiv = (
            <>
            {userTeamDisplay}
            -----VS------
            {opponentTeamDisplay}
            {currentFighter ? (
                <div>
                    <img src={currentFighter.sprite}></img>
                    <button onClick={() => attack(currentFighter, 0)}>{currentFighter.abilities[0]}</button>
                    <button onClick={() => attack(currentFighter, 1)}>{currentFighter.abilities[1]}</button>
                </div>
            ) : null}
            {opponentFighter ? (
                <div>
                    <img src={opponentFighter.sprite}></img>
                </div>
            ) : null}
            </>
        )
            
    }


  return (
    <div style={{display: 'flex'}}>
        {battleDiv ? battleDiv : teamSelectionDiv}
    </div>
  )
}

export default Battle