// Requiring a folder makes Node look for index.js inside it, so routes can
// write require('../controllers') instead of naming each controller file.
module.exports = {
  booksController: require('./books.controller')
};
