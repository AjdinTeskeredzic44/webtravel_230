import axios from 'axios';
import React, { useState } from 'react'

function UpdateUserForm({ user, setUsers }) {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(user.role);

    const handleUpdateUser = async e => {
        e.preventDefault();
        try {
            const data = {
                username,
                email,
                role
            }

            if (password) data.password = password;

            const res = await axios.put(`http://localhost:5000/api/users/${user._id}`, data, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            
            setUsers(users => users.map(u => u._id === user._id ? res.data : u));
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <form onSubmit={handleUpdateUser}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="text"
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
            <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
            />
            <button type="submit">Update User</button>
        </form>
    )
}

export default UpdateUserForm