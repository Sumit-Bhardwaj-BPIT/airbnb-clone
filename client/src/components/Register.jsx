import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
const Register = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    async function registerUser(ev){
        try{
          ev.preventDefault();
        await axios.post('http://localhost:4000/register',{
          name,
          email,
          password,
        });
        alert('success');
        }
        catch(err){
          alert('Registrationn failed try later');
        }
    }
  return (
    <div className='mb-44 pb-44 grow flex items-center justify-around' >
      <div className='mt-44' >
      <h1 className='text-4xl text-center pb-4 bold' >Register</h1>
        <form onSubmit={registerUser} className='max-w-md mx-auto ' >
            <input type="text" placeholder='John Doe'  value={name} onChange={ev=>setName(ev.target.value)} ></input>

            <input type='email'placeholder='Type your email' value={email} onChange={ev=>setEmail(ev.target.value)} ></input>
            <input type='password' placeholder='Password' value={password} onChange={ev=>setPassword(ev.target.value)} ></input>
           
            <button className='primary' >Register</button>

            <div className='text-center py-2 text-gray-500'>Already have an Account? Click Here
              <Link className='underline text-blue' to={'/login'} >  Login</Link>
            </div>
        </form>
    </div>
      </div>
        
  )
}

export default Register
