const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const COMMENTS_FILE = path.join(__dirname, 'comments.json');

/* =========================
GET COMMENTS
========================= */

app.get('/api/comments', (req, res) => {

    try {

        const comments =
            JSON.parse(
                fs.readFileSync(COMMENTS_FILE)
            );

        res.json(comments);

    } catch (err) {

        res.status(500).json({
            error: 'Failed to read comments'
        });

    }

});

/* =========================
SAVE COMMENT
========================= */

app.post('/api/comments', (req, res) => {

    try {

        const { name, message } = req.body;

        if (!name || !message) {

            return res.status(400).json({
                error: 'Name and message required'
            });

        }

        const comments =
            JSON.parse(
                fs.readFileSync(COMMENTS_FILE)
            );

        comments.unshift({
            name,
            message,
            createdAt: new Date()
        });

        fs.writeFileSync(
            COMMENTS_FILE,
            JSON.stringify(comments, null, 2)
        );

        res.json({
            success: true
        });

    } catch (err) {

        res.status(500).json({
            error: 'Failed to save comment'
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
