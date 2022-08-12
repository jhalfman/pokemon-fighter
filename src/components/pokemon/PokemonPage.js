import React from 'react';
import Pokemon from './Pokemon';
import { Outlet } from 'react-router-dom';


const PokemonPage = ({pokemonList}) => {
    
    return (
        <div className='mainContainer'>
            <div className='pokemonContainer'>
                {pokemonList.map( pokemon => {
                    return <Pokemon pokemon={pokemon} key={pokemon.id}/>
                })}
            </div>
            <Outlet />
        </div>
    )
}

export default PokemonPage