const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const notesFilePath = path.join(__dirname, '../data/notes.json');

// Get all notes
router.get('/', (req, res) => {
    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read notes' });
        }
        res.json(JSON.parse(data));
    });
});

// Post a new note
router.post('/', (req, res) => {
    const newNote = req.body;

    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read notes' });
        }

        const notes = JSON.parse(data);
        newNote.id = notes.length ? notes[notes.length - 1].id + 1 : 1;
        notes.push(newNote);

        fs.writeFile(notesFilePath, JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save note' });
            }
            res.json(newNote);
        });
    });
});

// Delete a note
router.delete('/:id', (req, res) => {
    const noteId = parseInt(req.params.id, 10);

    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read notes' });
        }

        const notes = JSON.parse(data);
        const updatedNotes = notes.filter(note => note.id !== noteId);

        fs.writeFile(notesFilePath, JSON.stringify(updatedNotes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete note' });
            }
            res.json({ message: 'Note deleted' });
        });
    });
});

module.exports = router;