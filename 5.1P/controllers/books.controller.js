const booksService = require('../services/books.service');

// Sends the whole catalog back as JSON.
const getAllBooks = (req, res) => {
  res.status(200).json({
    data: booksService.getAllBooks()
  });
};

// Reads the id from the URL, asks the service for that one book, and replies
// with 404 when the service finds nothing.
const getBookById = (req, res) => {
  const book = booksService.getBookById(req.params.id);

  if (!book) {
    return res.status(404).json({
      message: 'Book not found'
    });
  }

  res.status(200).json({
    data: book
  });
};

module.exports = { getAllBooks, getBookById };
