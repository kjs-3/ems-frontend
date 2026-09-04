import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import {Link,useNavigate} from 'react-router-dom';

const Login = () => {
    const[userName,setUsername]=useState("");
    const[userPassword,setPassword]=useState("");
    //to display error in uI
    const[error,setError]=useState("");
    const auth=useAuth();
    const nav=useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        setError("");
        try{
            await auth.login(userName,userPassword);
            nav('/dashboard')
        }
        catch(err){
            setError(err.message);
        }
    }

  return (
    <>
    <div className="auth-page">
        <form className="auth-box" onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error&&<p className="error-text">{error}</p>}
            <input type="text" placeholder='UserName'
            value={userName} 
            onChange={(e)=>setUsername(e.target.value)} required/>
            <input type="text" placeholder='Password'
            value={userPassword} 
            onChange={(e)=>setPassword(e.target.value)} required/>
            <button type="submit">Login</button>
            <p>No account? 
                <Link to="/register">Register</Link>
            </p>
        </form>
    </div>
    </>
  )
}

export default Login