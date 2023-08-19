import React from 'react';
import {useState, useEffect} from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";




// Sign Up
export const Login = () => {
  let navigate = useNavigate();
  const [loginUser, setLoginUser] = useState('')
const [loginPass, setLoginPass] = useState('')
const [loginBtnClicked, setLoginBtnClicked] = useState(false)




const handleClick = () => {
  setLoginBtnClicked(true)
}

useEffect(() => {
 
  if(loginBtnClicked && loginUser === Cookies.get('username') && loginPass === Cookies.get('password')){

    console.log('cookies & user login creds match')
    navigate('/dashboard')

  }else {
    console.debug('check if cred match cookies')
  }
}, [loginBtnClicked])
return(
  <>
  <div style={{textAlign: 'center'}}>
  <input type="email" value={loginUser} onChange={(e) => setLoginUser(e.target.value)}/>
  <br/>
  <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)}/>
  <br/>
<button onClick={handleClick}>Login</button>
</div>
</>
)

 
}

