const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    active: { type: Boolean, default: true },
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }]
});

module.exports = mongoose.model('User', UserSchema);
