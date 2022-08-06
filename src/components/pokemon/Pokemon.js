import React from 'react';
import { useEffect, useState } from 'react';

const Pokemon = () => {
    const [spriteList, setSpriteList] = useState([])

    useEffect(() => {fetch("http://localhost:3000/pokemon")
    .then(resp => resp.json())
    .then(data => {
        const sprites = data.map(mon => {
        return <img src={mon.sprite} key={mon.name}></img>
    })
    setSpriteList(sprites);
    })}, [])

    return (
        <div>{spriteList}</div>
    )
}

export default Pokemon