import React from 'react'
import '../styles/navbar.css'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login')
    }
    return (
        <div className='navbar'>

            <h1>myApp</h1>
            <button className='msg-btn' onClick={handleLogout}> Çıkış </button>
        </div>
    )
}

export default Navbar