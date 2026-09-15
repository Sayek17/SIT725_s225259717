const booksService = require('../services/books.service');

// Asks the service for every book and sends them back as JSON.
const getAllBooks = async (req, res, next) => {
  try {
    const books = await booksService.getAllBooks();
    res.status(200).json({
      statusCode: 200,
      data: books,
      message: 'Books retrieved using service'
    });
  } catch (error) {
    next(error);
  }
};

// Reads the id from the URL, asks the service for that one book, and replies
// with 404 when the service finds nothing.
const getBookById = async (req, res, next) => {
  try {
    const book = await booksService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({
        statusCode: 404,
        data: null,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      statusCode: 200,
      data: book,
      message: 'Book retrieved using service'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllBooks, getBookById };
