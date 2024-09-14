

import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [trips, setTrips] = useState([]);
    const [cat, setCat] = useState('');

    useEffect(() => {
        const fetchTrips = async () => {
            const res = await axios.get('http://localhost:5000/api/trips');
            setTrips(res.data);
        };
        fetchTrips();
    }, []);
    
    const categories = useMemo(() => trips.map(trip => trip.category).reduce((categories, category) => categories.includes(category) ? categories : [category, ...categories], []), [trips]);

    return (
        <div className="home-container">
            <h1>Travel Offers</h1>
            <select value={cat} onChange={e => setCat(e.target.value)}>
                <option value="">All</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <div className="trips-container">
                {trips.filter(trip => cat ? trip.category === cat : true).map(trip => (
                    <div key={trip._id} className="trip-card">
                        <h2>{trip.title}</h2>
                        <p>{trip.description}</p>
                        <Link to={`/trips/${trip._id}`} className="details-link">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
