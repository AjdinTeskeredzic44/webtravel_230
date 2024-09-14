const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers, createUser, deleteUser, updateUser, registerForTrip, getUserData, deleteTripFromUser } = require('../controllers/users');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Get all users (admin only)
router.get('/', auth, admin, getAllUsers);

router.get('/data', auth, getUserData);

router.put('/trip/:id', auth, registerForTrip);
router.delete('/trip/:id', auth, deleteTripFromUser);

// Create a new user (admin only)
router.post('/', auth, admin, createUser);

router.delete('/:id', auth, admin, deleteUser);

router.put('/:id', auth, admin, updateUser);

module.exports = router;
