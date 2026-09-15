const express = require('express');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/books.routes');

const app = express();
const port = process.env.PORT || 3000;

// Connect to the local MongoDB. The URI is hardcoded here, as the task asks,
// and it names the same database that scripts/seed.js fills.
mongoose.connect('mongodb://localhost:27017/booksdb');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error: ' + err.message);
});

// Serve the client page and its stylesheet from the public folder.
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Every path inside the router gets /api/books added in front of it.
app.use('/api/books', booksRoutes);

app.listen(port, () => {
  console.log('Books catalogue running at http://localhost:' + port);
});
