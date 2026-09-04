import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const auth = useAuth();
    const nav = useNavigate();
    function handlelogout() {
        auth.logout();
        nav('/login');
    }
    return (
        <>
            <div className='navbar'>
                <span className='navbar-title'>EmployeeManagementSystem</span>
                <div className='navbar-right'>
                    <span>{auth.userName} {auth.role}</span>
                    <button onClick={() => handlelogout()}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default Navbar