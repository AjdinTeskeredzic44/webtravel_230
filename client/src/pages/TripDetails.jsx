

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Context } from '../contexts/Context';

const TripDetails = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { user, isAdmin } = useContext(Context);

    useEffect(() => {
        const fetchTrip = async () => {
            const res = await axios.get(`http://localhost:5000/api/trips/${id}`);
            setTrip(res.data);
            setComments(res.data.comments);
        };

        fetchTrip();
    }, [id]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5000/api/trips/${id}/comments`, { text: comment }, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setComments(res.data);
            setComment('');
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleDeleteComment = async (tripId, id) => {
        try {
            await axios.delete(`http://localhost:5000/api/trips/${tripId}/comments/${id}`, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setComments(comments.filter(c => c._id !== id))
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleRegisterForTrip = async (id) => {
        try {
             await axios.put(`http://localhost:5000/api/users/trip/${id}`, {}, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
        } catch (err) {
            console.error(err.message);
        }
    }

    if (!trip) return <div>Loading...</div>;

    return (
        <div>
            <h1>{trip.title}</h1>
            <p>{trip.description}</p>
            {user.exists && <button type="submit" onClick={() => handleRegisterForTrip(trip._id)}>Register for trip</button>}
            <h2>Comments</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>
                        {comment.text} - <strong>{comment.user.username}</strong>
                        {isAdmin && <button type="submit" onClick={() => handleDeleteComment(trip._id, comment._id)}>Delete</button>}
                    </li>
                ))}
            </ul>
            {user.exists && (
                <form onSubmit={handleAddComment}>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment"
                        required
                    />
                    <button type="submit">Add Comment</button>
                </form>
            )}
        </div>
    );
};

export default TripDetails;
