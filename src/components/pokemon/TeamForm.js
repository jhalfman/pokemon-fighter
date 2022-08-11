import React from 'react'

const TeamForm = ({team}) => {
    console.log(team);
  return (
    <form id='teamForm'>
        <h2 style={{width: "100%", textAlign: 'center'}}>Current Team</h2>
        <label name="teamName">Enter Team Name:</label>
        <input type="text" name="teamName" id="teamNameField" placeholder='...'></input>
        <div className='teamThumbnail'>{team[0] ? <img src={team[0].sprite}/> : null}</div>
        <div className='teamThumbnail'>{team[1] ? <img src={team[1].sprite}/> : null}</div>
        <div className='teamThumbnail'>{team[2] ? <img src={team[2].sprite}/> : null}</div>
        <input type="submit" id="submitButton" value="Submit Team For Fight"></input>
    </form>
  )
}

export default TeamForm