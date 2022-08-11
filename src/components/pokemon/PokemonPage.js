import React from 'react';
import { useEffect, useState } from 'react';
import Pokemon from './Pokemon';
import PokemonHighlight from './PokemonHighlight';


const PokemonPage = ({addToTeam, team}) => {
    const [spriteList, setSpriteList] = useState([])
    const [highlight, setHighlight] = useState(null)

    useEffect(() => {fetch("http://localhost:3000/pokemon")
    .then(resp => resp.json())
    .then(data => {
        const sprites = data.map(mon => {
        return mon;
    })
    setSpriteList(sprites);
    })}, [])

    function highlightPokemon(sprite) {
        setHighlight(sprite);
    }

    return (
        <div className='mainContainer'>
            <div className='pokemonContainer'>
                {spriteList.map( sprite => {
                    return <Pokemon sprite={sprite} key={sprite.id} highlightPokemon={highlightPokemon}/>
                })}
            </div>
            <PokemonHighlight highlight={highlight} addToTeam={addToTeam} team={team}/>
            
        </div>
    )
}

export default PokemonPage