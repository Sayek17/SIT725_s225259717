const express = require('express');
const booksRoutes = require('./routes/books.routes');

const app = express();
const port = process.env.PORT || 3000;

// Serve the client page and its stylesheet from the public folder.
app.use(express.static(__dirname + '/public'));

// Every path inside the router gets /api/books added in front of it.
app.use('/api/books', booksRoutes);

app.listen(port, () => {
  console.log('Books catalog running at http://localhost:' + port);
});
