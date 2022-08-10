import React, {useState} from 'react'

const Battle = ({teamList}) => {
    const [currentTeam, setCurrentTeam] = useState({teamName: "default"});

    function selectTeam(e) {
        if (e.target.value === "default") {
            setCurrentTeam({teamName: "default"})
        }
        else {
            const teamSelection = teamList.find(team => team.teamName === e.target.value);
            setCurrentTeam(teamSelection);
        }
    }


  return (
    <div>
        <select name="currentTeam" id="currentTeam" onChange={selectTeam} value={currentTeam.teamName}>
            <option key="default" value="default">SELECT A TEAM</option>
            {teamList.map(team => {
                return <option key={team.id} value={team.teamName}>{team.teamName}</option>
            })}
        </select>
        {currentTeam.teamName !== "default" ? <div><img src={currentTeam.pokemon1.sprite}/><img src={currentTeam.pokemon2.sprite}/> <img src={currentTeam.pokemon3.sprite}/></div> : null}
        {currentTeam.teamName !== "default" ? <button>Start Fight</button> : null}
    </div>
  )
}

export default Battle