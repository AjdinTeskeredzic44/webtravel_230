

import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../contexts/Context';

const UserDashboard = () => {
    const { user, setUser } = useContext(Context);

    useEffect(() => {
        const fetchUserData = async () => {
            const res = await axios.get('http://localhost:5000/api/users/data', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setUser({ ...res.data, exists: true, loading: false });
        };

        fetchUserData();
    }, []);

    const handleDeleteTrip = async (id) => { 
        try {
            const res = await axios.delete(`http://localhost:5000/api/users/trip/${id}`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });

            setUser({ ...res.data, exists: true, loading: false });
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div>
            <h1>User Dashboard</h1>
            <h2>My Trips</h2>
            <ul>
                {user.trips?.map(trip => (
                    <li key={trip._id}>
                        {trip.title}
                        <button onClick={() => handleDeleteTrip(trip._id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;
