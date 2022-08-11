import React from 'react'
import TeamForm from './TeamForm';

const PokemonHighlight = ({highlight, addToTeam, team}) => {
  return (
    <div className='pokemonHighlight'>
        <h2 id='highlightTitle'>{highlight ? highlight.name : "Select a Pokemon"}</h2>
        {highlight ? <img id='highlightedPokemon' src={highlight.sprite} alt="big picture"/> : null}
        {highlight ? (<h4 id='statBox'>Type 1: {highlight.types.type1} <br></br> Type 2: {highlight.types.type2} <br></br> HP: {highlight.hp} <br></br> Abilities: {highlight.abilities}</h4>) : <h4 id='statBox'>Type 1: <br></br> Type 2: <br></br> Hp: <br></br> Abilities:</h4>}
        {highlight ? <button id='addTeamButton' onClick={() => addToTeam(highlight)}>Add to Team!</button> : null}
        <TeamForm team={team}/>
    </div>
  )
}

export default PokemonHighlight