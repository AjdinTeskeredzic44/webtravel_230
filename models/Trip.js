

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const TripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    questions: [{ user: String, question: String }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    comments: [CommentSchema]
});

module.exports = mongoose.model('Trip', TripSchema);
