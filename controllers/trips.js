// controllers/trips.js
const jwt = require('jsonwebtoken');
const Trip = require('../models/Trip');

// Get all trips
const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find().populate('comments.user', 'username');
        res.json(trips);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get single trip
const getTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id).populate('comments.user', 'username');
        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }
        res.json(trip);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Create new trip
const createTrip = async (req, res) => {
    const { title, description, category, startDate, endDate } = req.body;

    try {
        const newTrip = new Trip({
            title,
            description,
            category,
            startDate,
            endDate
        });

        const trip = await newTrip.save();
        res.json(trip);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update trip
const updateTrip = async (req, res) => {
    try {
        let trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!trip) {
            return res.status(404).send();
        }

        res.json(trip);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete trip
const deleteTrip = async (req, res) => {
    try {
        let trip = await Trip.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Trip removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Add comment to trip
const addComment = async (req, res) => {
    const { text } = req.body;

    try {
        const trip = await Trip.findByIdAndUpdate(req.params.id, {
            $push: {
                comments: {
                $each: [{
                    user: jwt.verify(req.headers['x-auth-token'], 'secret').user.id,
                    text
                }],
                $position: 0
            }
            }
        }, { new: true }).populate('comments.user', 'username')

        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }

        res.json(trip.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const deleteComment = async (req, res) => {
    try {
        const updatedTrip = await Trip.findByIdAndUpdate(
            req.params.tripId,
            {
                $pull: { comments: { _id: req.params.id } }
            },
            { new: true }
        );

        if (!updatedTrip) return res.status(404).send();

        res.status(200).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = { getTrips, getTrip, createTrip, updateTrip, deleteTrip, addComment, deleteComment };
