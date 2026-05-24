const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/* =========================
DATABASE CONNECTION
========================= */

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const Comment = mongoose.model('Comment', new mongoose.Schema({
    name:      { type: String, required: true },
    message:   { type: String, required: true },
    createdAt: { type: Date,   default: Date.now }
}));

/* =========================
GET COMMENTS
========================= */

app.get('/api/comments', async (req, res) => {

    try {

        const comments = await Comment.find().sort({ createdAt: -1 });
        res.json(comments);

    } catch (err) {

        res.status(500).json({ error: 'Failed to read comments' });

    }

});

/* =========================
SAVE COMMENT
========================= */

app.post('/api/comments', async (req, res) => {

    try {

        const { name, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({ error: 'Name and message required' });
        }

        await Comment.create({ name, message });
        res.json({ success: true });

    } catch (err) {

        res.status(500).json({ error: 'Failed to save comment' });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
