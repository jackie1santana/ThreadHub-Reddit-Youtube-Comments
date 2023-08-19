import React from 'react'
import {Login } from '../auth/Login'
import {Register} from '../auth/Register'

export const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>Want to sign up?<Register/></p>
           <p>Already Signed up? <Login /></p> 
        </div>
    )
}
