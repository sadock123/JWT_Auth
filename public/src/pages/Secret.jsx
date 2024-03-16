import React from 'react'
import {useNavigate} from 'react-router-dom'
function Secret() {
  const navigate = useNavigate();
  const logOut =  ()  =>{
    navigate("/login")
  };
  return (
    <div className="private">
      <h1>Super Secret webpage</h1>
      <button onClick={logOut}>Log Out</button>
    </div>
  )
}

export default Secret