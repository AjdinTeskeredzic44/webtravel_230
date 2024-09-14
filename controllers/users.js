const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { default: mongoose } = require('mongoose');

// Register User
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            'secret',
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        if(!user.active) {
            return res.status(400).json({ msg: 'Not active'});
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role,
                username: user.username
            }
        };

        jwt.sign(
            payload,
            'secret',
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const data = req.body;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(req.body.password, salt);
        }

        const user = await User.findByIdAndUpdate(req.params.id, data, { new: true });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// Create new user
const createUser = async (req, res) => {
    const { username, email, password, role, active } = req.body;

    try {
        const newUser = new User({
            username,
            email,
            role,
            active
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        const user = await newUser.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const registerForTrip = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, {
            $push: {
                trips: req.params.id
            }
        });

        if (!user) return res.status(404).send();

        res.status(200).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const getUserData = async (req, res) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const user = await User.findById(req.user.id).populate({
            path: 'trips',
            match: { endDate: { $lt: currentDate } }
        });

        if (!user) return res.status(200).send();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const deleteTripFromUser = async (req, res) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            $pull: {
                trips: req.params.id
            }
        }, { new: true }).populate({
            path: 'trips',
            match: { endDate: { $lt: currentDate } }
        });

        if (!updatedUser) return res.status(404).send();

        res.json(updatedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = { registerUser, loginUser, getAllUsers, deleteUser, createUser, updateUser, getUserData, registerForTrip, deleteTripFromUser };
