import React from 'react'

const Records = ({teamList}) => {
  return (
    <div>
        {teamList.map(team => {
            return (
                <div key={team.id}>
                    <h1>{team.teamName}</h1>
                    <h3>wins: {team.wins}</h3>
                    <h3>losses: {team.losses}</h3>
                    <h3>draws: {team.draws}</h3>
                </div>
            )
        })}
    </div>
  )
}

export default Records