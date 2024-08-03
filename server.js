const express = require('express');
const path = require('path');
const fs = require('fs');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});