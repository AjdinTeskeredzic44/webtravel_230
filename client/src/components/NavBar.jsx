// src/components/NavBar.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { Context } from '../contexts/Context';

const NavBar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const { user, isAdmin } = useContext(Context);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!user.exists && (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
                {isAdmin && (
                    <li>
                        <Link to="/admin">Admin Dashboard</Link>
                    </li>
                )}
                {user.exists && (
                    <>
                        <li>
                            <Link to="/user">User Dashboard</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;