import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Register from './Register';
import axios from 'axios';
import Account from './Account';
import { UserContext } from '../UserContext';
const Login = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);
  const {setUser}  = useContext(UserContext);
  async function handleloginSubmit(ev){
    ev.preventDefault();
    try{
      
      const {data} = await axios.post('http://localhost:4000/login',
        {email,password},
      );
       setUser(data);
      alert('login successful');
      setRedirect(true);
    }
    catch(err){
      alert('login failedddd');
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  } 

  return (
    <div className='mb-44 pb-44 mt-0 grow flex items-center justify-around' >
      <div className='mt-44' >
      <h1 className='text-4xl text-center pb-4 bold' >Login</h1>
        <form onSubmit={handleloginSubmit} className='max-w-md mx-auto ' >
            <input type='email'placeholder='Type your email' value={email} onChange={(event)=>setEmail(event.target.value)} ></input>
            <input type='password' placeholder='Password' value={password} onChange={(event)=>setPassword(event.target.value)} ></input>
            <button className='primary' >Login</button>

            <div className='text-center py-2 text-gray-500'>Don't have an Account? Click Here
              <Link className='underline text-blue' to={'/register'} >  Register</Link>
            </div>
        </form>
    </div>
      </div>
        
  )
}

export default Login
