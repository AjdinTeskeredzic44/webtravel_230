

import { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateUserForm from '../components/UpdateUserForm';
import UpdateTripForm from '../components/UpdateTripForm';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [trips, setTrips] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [active, setActive] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get('http://localhost:5000/api/users', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setUsers(res.data);
        };

        const fetchTrips = async () => {
            const res = await axios.get('http://localhost:5000/api/trips');
            setTrips(res.data);
        };

        fetchUsers();
        fetchTrips();
    }, []);

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users', {
                username,
                email,
                password,
                role,
                active
            }, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setUsers([...users, res.data]);
            setUsername('');
            setEmail('');
            setPassword('');
            setRole('');
            setActive('');
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleAddTrip = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/trips', {
                title,
                description,
                category,
                startDate,
                endDate
            }, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setTrips([...trips, res.data]);
            setTitle('');
            setDescription('');
            setCategory('');
            setStartDate('');
            setEndDate('');
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setUsers(users.filter(user => user._id !== userId));
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleDeactivateUser = async (userId, status) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/users/${userId}`, { active: status }, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            console.log(res.data)
            setUsers(users.map(user => user._id === userId ? res.data : user));
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleDeleteTrip = async (_id) => {
        try {
            await axios.delete(`http://localhost:5000/api/trips/${_id}`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setTrips(trips.filter(trip => trip._id !== _id));
        } catch (err) {
            console.error(err.message);
        }
    };

    

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Add User</h2>
            <form onSubmit={handleAddUser}>
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
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Active"
                    value={active}
                    onChange={(e) => setActive(e.target.value)}
                    required
                />
                <button type="submit">Add User</button>
            </form>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.username} - {user.email}
                        <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                        <button onClick={() => handleDeactivateUser(user._id, !user.active)}>{user.active ? 'Deaktiviraj' : 'Aktiviraj'}</button>
                        <UpdateUserForm user={user} setUsers={setUsers} />
                    </li>
                ))}
            </ul>
            <h2>Add Trip</h2>
            <form onSubmit={handleAddTrip}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
                <button type="submit">Add Trip</button>
            </form>
            <h2>Trips</h2>
            <ul>
                {trips.map(trip => (
                    <li key={trip._id}>{trip.title}
                        <button onClick={() => handleDeleteTrip(trip._id)}>Delete</button>
                        <UpdateTripForm trip={trip} setTrips={setTrips} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
