import React from 'react';
import {useState, useEffect } from 'react';
import Cookies from 'js-cookie'


// Sign Up
export const Register = () => {
  const [registerUser, setRegisterUser] = useState('')
const [pass, setPass] = useState('')
const [registered, setRegistered] = useState(false)

const handleClick = () => {
  setRegistered(true)
 
 
}


useEffect(() => {
 
  if(registered){
    Cookies.set('username', registerUser, { expires: 7 })
    Cookies.set('password', pass, { expires: 7 })
  }
}, [registered])

return(
  <>
  <div style={{textAlign: 'center'}}>
  <input type="email" value={registerUser} onChange={(e) => setRegisterUser(e.target.value)}/>
  <br/>
  <input type="password" value={pass} onChange={(e) => setPass(e.target.value)}/>
  <br/>
<button onClick={handleClick}>Register</button>
</div>
</>
)

 
}

