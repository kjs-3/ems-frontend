import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Apis/Api';

const Register = () => {
    const [userName, setuserName] = useState("");
    const [userPassword, setuserPassword] = useState("");
    const [role, setrole] = useState("EMPLOYEE");
    const [error, seterror] = useState("");
    const [successmsg, setsuccessmsg] = useState("");
    const nav = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        seterror("");
        setsuccessmsg("");
        try {
            await registerUser(userName, userPassword, role);
            setsuccessmsg("Registered! Redirecting to Login.....");
            setTimeout(() => {
                nav("/login")
            }, 1000);
        }
        catch (err) {
            seterror(err.message);
        }
    }
    return (
        <>
            <div className="auth-page">
                <form className="auth-box" onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    {error && <p className="error-text">{error}</p>}
                    {successmsg && <p className="success-text">{successmsg}</p>}
                    <input type="text" placeholder='UserName'
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)} required />
                    <input type="text" placeholder='Password'
                        value={userPassword}
                        onChange={(e) => setuserPassword(e.target.value)} required />
                    <select value={role} onChange={(e) => setrole(e.target.value)}>
                        <option value="EMPLOYEE">EMPLOYEE</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                    <button type="submit" >Register</button>
                    <p>Already have an account?
                        <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Register