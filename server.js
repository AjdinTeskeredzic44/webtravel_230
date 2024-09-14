const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = "mongodb+srv://ajdinteskeredzic20:ajdin123@cluster0.dal5o.mongodb.net/dbtravel_230?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/trips', require('./routes/trips'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started on port 5000"));
