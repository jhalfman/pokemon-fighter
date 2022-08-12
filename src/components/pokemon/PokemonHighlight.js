import React from 'react';
import {useParams} from 'react-router-dom';

const PokemonHighlight = ({pokemonList}) => {
    
    let {id} = useParams();
    const highlight = pokemonList.find(pokemon => pokemon.id.toString() === id)
    let highlightDiv;
    if (highlight) {
        highlightDiv = (
        <div className='pokemonHighlight'>
            <h2 id='highlightTitle'>{highlight.name}</h2>
            <img id='highlightedPokemon' src={highlight.sprite} alt="big picture"/>
            <h4 id='statBox'>Type 1: {highlight.types.type1} <br></br> Type 2: {highlight.types.type2} <br></br> HP: {highlight.hp} <br></br> Abilities: {highlight.abilities[0]} | {highlight.abilities[1]}</h4> 
        </div>
        )
    }
    else {
        highlightDiv = (
            <div className='pokemonHighlight'>
                <h2 id='highlightTitle'>"Select a Pokemon"</h2>
                <h4 id='statBox'>Type 1: <br></br> Type 2: <br></br> Hp: <br></br> Abilities:</h4>
            </div>
        )
    }

    

    
  return (
    <>
    {highlightDiv}
    </>
  )
    
}

export default PokemonHighlight

/* import useLocation and call useLocation().state.highlight to access Link information */