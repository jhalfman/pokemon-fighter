import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

const Battle = ({teamList, pokemonList, newRecordUpdate}) => {
    const [currentTeam, setCurrentTeam] = useState({teamName: "default"});
    const [opponentTeam, setOpponentTeam] = useState(null);
    const [currentFighter, setCurrentFighter] = useState(null);
    const [opponentFighter, setOpponentFighter] = useState(null);
    const [outcome, setOutcome] = useState(null)
    const URL = "https://pokemonfighterserver.herokuapp.com/"
    
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
        let randomOpp =  Math.floor(Math.random() * 3);
        setOpponentFighter(opponentTeam[randomOpp]);
    }

    function resetBattle() {
        setCurrentTeam({teamName: "default"})
        setOpponentTeam(null);
        setCurrentFighter(null);
        setOpponentFighter(null);
        setOutcome(null);
    }

    
    function recordUpdate(outcome) {
        let updatedRecord = {[outcome]: currentTeam[outcome] + 1}
        setOutcome(outcome);
        fetch(URL + `teams/${currentTeam.id}`, {
            method: "PATCH",
            headers: {
                "Accept": "applicaton/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                updatedRecord
            )
        })
        .then(resp=>resp.json())
        .then(data => {
            setTimeout(resetBattle, 3500);
            newRecordUpdate(data);
        })
    }

    function attack(fighter, attackNumber) {
        switch(fighter.abilities[attackNumber]) {           
            case "normal attack":
                if (opponentFighter.types.type1 === "rock" || opponentFighter.types.type1 === "ghost") {
                    recordUpdate("losses")
                }
                else {
                    recordUpdate("draws")
                }
                break;
            case "fighting attack":
                if (opponentFighter.types.type1 === "normal" || opponentFighter.types.type1 === "rock" || opponentFighter.types.type1 === "ice") {
                    recordUpdate("wins")
                }
                else if (opponentFighter.types.type1 === "flying" || opponentFighter.types.type1 === "poison" || opponentFighter.types.type1 === "bug" || opponentFighter.types.type1 === "psychic") {
                    recordUpdate("losses")
                }
                else {
                    recordUpdate("draws")
                }
                break;
            case "flying attack":
                if (opponentFighter.types.type1 === "fighting" || opponentFighter.types.type1 === "bug" || opponentFighter.types.type1 === "grass") {
                    recordUpdate("wins")
                }
                else if (opponentFighter.types.type1 === "rock" || opponentFighter.types.type1 === "electric" ) {
                    recordUpdate("losses")
                }
                else {
                    recordUpdate("draws")
                }
                break;
            case "poison attack":
                if (opponentFighter.types.type1 === "grass") {
                    recordUpdate("wins")
                }
                else if (opponentFighter.types.type1 === "poison" || opponentFighter.types.type1 === "ground" || opponentFighter.types.type1 === "rock" || opponentFighter.types.type1 === "ghost") {
                    recordUpdate("losses")
                }
                else {
                    recordUpdate("draws")
                }
                break;
            case "ground attack":
                if (opponentFighter.types.type1 === "poison" || opponentFighter.types.type1 === "rock" || opponentFighter.types.type1 === "fire" || opponentFighter.types.type1 === "electric") {
                    recordUpdate("wins")
                }
                else if (opponentFighter.types.type1 === "bug" || opponentFighter.types.type1 === "grass") {
                    recordUpdate("losses")
                }
                else {
                    recordUpdate("draws")
                }
                break;
            case "rock attack":
                if (opponentFighter.types.type1 === "flying" || opponentFighter.types.type1 === "bug" || opponentFighter.types.type1 === "fire" || opponentFighter.types.type1 === "ice") {
                    recordUpdate("wins")
                }
                else if (opponentFighter.types.type1 === "fighting" || opponentFighter.types.type1 === "ground") {
                    recordUpdate("losses")
                }
                else {
                    recordUpdate("draws")
                }
                break;
            case "bug attack":
                if (opponentFighter.types.type1 === "grass" || opponentFighter.types.type1 === "psychic") {
                    recordUpdate("wins")
                }
                else if (opponentFighter.types.type1 === "fighing" || opponentFighter.types.type1 === "flying" || opponentFighter.types.type1 === "poison" || opponentFighter.types.type1 === "ghost" || opponentFighter.types.type1 === "fire") {
                    recordUpdate("losses")
                }
                else {
                    recordUpdate("draws")
                }
            case "ghost attack":
                if (opponentFighter.types.type1 === "ghost" || opponentFighter.types.type1 === "psychic") {
                    recordUpdate("wins")
                }
                else {
                    recordUpdate("draws")
                }
                break;
            case "fire attack":
                if (opponentFighter.types.type1 === "bug" || opponentFighter.types.type1 === "grass" || opponentFighter.types.type1 === "ice") {
                    recordUpdate("wins")
                }
                else if (opponentFighter.types.type1 === "rock" || opponentFighter.types.type1 === "fire" || opponentFighter.types.type1 === "water" || opponentFighter.types.type1 === "dragon") {
                    recordUpdate("losses")
                }
                else {
                    recordUpdate("draws")
                }
                break;
            case "water attack":
                if (opponentFighter.types.type1 === "ground" || opponentFighter.types.type1 === "rock" || opponentFighter.types.type1 === "fire") {
                    recordUpdate("wins")
                }
                else if (opponentFighter.types.type1 === "water" || opponentFighter.types.type1 === "grass" || opponentFighter.types.type1 === "dragon") {
                    recordUpdate("losses")
                }
                else {
                    recordUpdate("draws")
                }
                break;
            case "grass attack":
                if (opponentFighter.types.type1 === "ground" || opponentFighter.types.type1 === "rock" || opponentFighter.types.type1 === "water") {
                    recordUpdate("wins")
                }
                else if (opponentFighter.types.type1 === "flying" || opponentFighter.types.type1 === "poison" || opponentFighter.types.type1 === "grass" || opponentFighter.types.type1 === "bug" || opponentFighter.types.type1 === "fire" || opponentFighter.types.type1 === "dragon") {
                    recordUpdate("losses")
                }
                else {
                    recordUpdate("draws")
                }
                break;
            case "electric attack":
                if (opponentFighter.types.type1 === "flying" || opponentFighter.types.type1 === "water") {
                    recordUpdate("wins")
                }
                else if (opponentFighter.types.type1 === "ground" || opponentFighter.types.type1 === "grass" || opponentFighter.types.type1 === "electric" || opponentFighter.types.type1 === "dragon") {
                    recordUpdate("losses")
                }
                else {
                    recordUpdate("draws")
                }
                break;
            case "psychic attack":
                if (opponentFighter.types.type1 === "fighting" || opponentFighter.types.type1 === "poison") {
                    recordUpdate("wins")
                }
                else if (opponentFighter.types.type1 === "psychic") {
                    recordUpdate("losses")
                }
                else {
                    recordUpdate("draws")
                }
                break;
            case "ice attack":
                if (opponentFighter.types.type1 === "flying" || opponentFighter.types.type1 === "ground" || opponentFighter.types.type1 === "dragon") {
                    recordUpdate("wins")
                }
                else if (opponentFighter.types.type1 === "fire" || opponentFighter.types.type1 === "water" || opponentFighter.types.type1 === "ice") {
                    recordUpdate("losses")
                }
                else {
                    recordUpdate("draws")
                }
                break;
            case "dragon attack":
                if (opponentFighter.types.type1 === "dragon") {
                    recordUpdate("wins")
                }
                else {
                    recordUpdate("draws")
                }
        }
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
                <div className="break"></div>
                <img className="teamPreview" src={currentTeam.pokemon1.sprite}/>
                <img className="teamPreview" src={currentTeam.pokemon2.sprite}/>
                <img className="teamPreview" src={currentTeam.pokemon3.sprite}/>
                <div className="break"></div>
                <button id="startFightButton" onClick={startFight}>Start Fight</button>
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
                <div key={opponent.id} className='battlePokemon'>
                    <h4>{opponent.name}</h4>
                    <img src={opponent.sprite}></img>
                </div>
            )
        })
        const userTeamDisplay = (
            <>
                <div className='battlePokemon' onClick={() => {setCurrentFighter(currentTeam.pokemon1); opponentSelection()}}>
                    <h4>{currentTeam.pokemon1.name}</h4>
                    <img src={currentTeam.pokemon1.sprite} />
                </div>
                <div className='battlePokemon' onClick={() => {setCurrentFighter(currentTeam.pokemon2); opponentSelection()}}>
                <h4>{currentTeam.pokemon2.name}</h4>
                    <img src={currentTeam.pokemon2.sprite} />
                </div>
                <div className='battlePokemon' onClick={() => {setCurrentFighter(currentTeam.pokemon3); opponentSelection()}}>
                <h4>{currentTeam.pokemon3.name}</h4>
                    <img src={currentTeam.pokemon3.sprite} />
                </div>
            </>
        )
        battleDiv = (
            <>
            {currentFighter ? null : userTeamDisplay}
            {currentFighter ? null : <div id="fighterSelect">
                <h2>&lt;-----{currentTeam.teamName}</h2>
                <h1>Select your fighter!</h1>
                <h2>Enemy team -----&gt;</h2>
            </div>}
            {currentFighter ? null : opponentTeamDisplay}
            <div className="break"></div>
            {currentFighter ? (
                <div id="currentFighter">
                    <img src={currentFighter.sprite}></img>
                    <div className="break"></div>
                    <button onClick={() => attack(currentFighter, 0)}>{currentFighter.abilities[0]}</button>
                    <button onClick={() => attack(currentFighter, 1)}>{currentFighter.abilities[1]}</button>
                </div>
            ) : null}
            {currentFighter ? <div id="fighterSelect">
                <h2>&lt;-----{currentFighter.name}</h2>
                <h1>Select your Attack!</h1>
                <h2>{opponentFighter.name} -----&gt;</h2>
            </div> : null}
            {opponentFighter ? (
                <div id="enemyFighter">
                    <img src={opponentFighter.sprite}></img>
                </div>
            ) : null}
            <div className="break"></div>
            {(outcome === "wins") ? <h2 className='outcome1'>YOU WIN</h2> : null}
            {(outcome === "losses") ? <h2 className='outcome2'>YOU LOSE</h2> : null}
            {(outcome === "draws") ? <h2 className='outcome3'>YOU TIE</h2> : null}
            </>
        )
            
    }


  return (
    <div id="battleBoxContainer">
        {battleDiv ? battleDiv : teamSelectionDiv}
    </div>
  )
}

export default Battle