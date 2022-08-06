import { useEffect, useState } from 'react';

function App() {
const [spriteList, setSpriteList] = useState([])

  useEffect(() => {fetch("http://localhost:3000/pokemon")
  .then(resp => resp.json())
  .then(data => {
    const sprites = data.map(mon => {
      return <img src={mon.sprite}></img>
    })
    setSpriteList(sprites);
  })}, [])
                
  return (
    <div className="App">
      <h1>POKEMON FIGHT</h1>
    </div>
  );
}

export default App;
