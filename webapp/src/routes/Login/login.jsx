import React from 'react';
import { useState } from 'react';
import classes from './login.css';
import Cookies from "js-cookie";

import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState('')
  
const handleChange = e => {
  setUser({...user, [e.target.name]:e.target.value});
  console.log(user);
}
const handleSubmit = e => {
  e.preventDefault();
  axios
      .post("https://localhost:5000/auth/login", { user })
      .then(data => {const {accessToken, refreshToken} = data.data;
      Cookies.set("access", accessToken);
      Cookies.set("refresh", refreshToken);
      });
  };

const refresh = refreshToken => {

}

const reqLogin = async (accessToken, refreshToken) => {

}

const hasAccess = async (accessToken, refreshToken) => {
  if (!refreshToken) return null;

  if (accessToken === undefined){
      accessToken = refresh(refreshToken);
      return accessToken;
  }
  return accessToken;
}

const pr = async e => {
  let accessToken = Cookies.get("access");
  let refreshToken = Cookies.get("refresh");

  accessToken = await hasAccess(accessToken, refreshToken);
  if (!accessToken){

  }else{
    await reqLogin(accessToken, refreshToken);

  }
}

return (
    <form className='login-form' onChange={handleChange} onSubmit={handleSubmit}>
        <div className='login-inf'>
        <div className='top'>
        <p className='signin'>Sign in</p>

        <p className='hline'></p>
        </div>
      <label className='nick'>
        <input className='input-nick' name='nick'  type="text" placeholder='Nick' />
      </label>
      <br/>
      <label className='pwd'>
        <input className='input-pwd'  name='password' type="password" placeholder='Password' />
      </label>
      <div>
        <button className='login-btn'  type="submit">LOG IN</button>
      </div>
      </div>
      
    </form>
  )
}

export default Login;