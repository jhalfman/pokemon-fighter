import React from 'react';
import {Link} from 'react-router-dom';

const Pokemon = ({pokemon}) => {

    return (
        <Link to={`/pokemon/${pokemon.id}`} ><img id='pokemonSprite' src={pokemon.sprite}></img></Link>
    )
}

export default Pokemon;

/* pass state variable if want to use state instead of params
state={{highlight: pokemon}}
*/