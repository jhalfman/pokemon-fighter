import React from 'react'

const Team = ({team, removeFromTeam}) => {
  return (
    <div>
      <h2>CURRENT TEAM</h2>
      {team.map(mon => {
        return (
          <div>
            <img src={mon.sprite} alt="team pic" key={mon.name}></img>
            <button onClick={() => removeFromTeam(mon)}>REMOVE FROM TEAM</button>
          </div>
        )
      })}
      <button>FIGHT</button>
    </div>
  )
}

export default Team