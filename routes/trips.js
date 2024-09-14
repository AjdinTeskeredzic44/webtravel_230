

const express = require('express');
const router = express.Router();
const { getTrips, getTrip, createTrip, updateTrip, deleteTrip, addComment, deleteComment } = require('../controllers/trips');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all trips
router.get('/', getTrips);

// Get single trip
router.get('/:id', getTrip);

// Create a new trip (admin only)
router.post('/', auth, admin, createTrip);

// Update a trip (admin only)
router.put('/:id', auth, admin, updateTrip);

// Delete a trip (admin only)
router.delete('/:id', auth, admin, deleteTrip);

// Add comment to trip
router.post('/:id/comments', auth, addComment);

// Delete comment from trip
router.delete('/:tripId/comments/:id', auth, admin, deleteComment);

module.exports = router;
