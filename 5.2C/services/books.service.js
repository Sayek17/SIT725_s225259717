const Book = require('../models/Book');

// Data access only. No business logic lives here, and there is no sample data
// in the code either. Everything comes back from MongoDB.
// The documents are returned as Mongoose documents rather than lean objects,
// so the price getter on the schema runs when the controller sends the JSON.

// Reads every book in the collection.
const getAllBooks = async () => {
  return Book.find({});
};

// Reads one book by its id field, not by the MongoDB _id.
const getBookById = async (id) => {
  return Book.findOne({ id: id });
};

module.exports = { getAllBooks, getBookById };
