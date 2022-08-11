import React from 'react'

const Pokemon = ({sprite, highlightPokemon}) => {
    

    return (
        <img id='pokemonSprite' src={sprite.sprite} onClick={() => highlightPokemon(sprite)}></img>
    )
}

export default Pokemon;