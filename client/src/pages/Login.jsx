

import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
            const decodedToken = jwtDecode(res.data.token);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(decodedToken.user));
            if (decodedToken.user.role === 'admin') {
                window.location.href = '/admin';
            } else {
                window.location.href = '/user';
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <p>Don’t have an account? <Link to='/register'>Sign up</Link></p>
        </div>
    );
};

export default Login;
