import React from 'react'

const Records = ({teamList, updateTeams}) => {
  const URL = "http://localhost:3000/"

  function deleteTeam(id) {
    fetch(URL + `teams/${id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(data => updateTeams(id))
  }

  return (
    <div id="recordsBox">
        {teamList.map(team => {
            return (
                <div key={team.id} id="teamScore">
                    <h1>{team.teamName}</h1>
                    <h3>wins: {team.wins}</h3>
                    <h3>losses: {team.losses}</h3>
                    <h3>draws: {team.draws}</h3>
                    <button onClick={() => deleteTeam(team.id)}>DELETE TEAM</button>
                </div>
            )
        })}
    </div>
  )
}

export default Records