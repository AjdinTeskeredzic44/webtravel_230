import axios from 'axios';
import React, { useState } from 'react'

function UpdateTripForm({ trip, setTrips }) {
    const [title, setTitle] = useState(trip.title);
    const [description, setDescription] = useState(trip.description);
    const [category, setCategory] = useState(trip.category);
    const [startDate, setStartDate] = useState(new Date(trip.startDate).toISOString().slice(0,10));
    const [endDate, setEndDate] = useState(new Date(trip.endDate).toISOString().slice(0,10));

    const handleUpdateTrip = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/api/trips/${trip._id}`, {
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

            setTrips(trips => trips.map(t => t._id === trip._id ? res.data : t));
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <form onSubmit={handleUpdateTrip}>
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
            <button type="submit">Update Trip</button>
        </form>
    )
}

export default UpdateTripForm