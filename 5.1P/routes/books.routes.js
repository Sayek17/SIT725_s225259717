const express = require('express');
const Controllers = require('../controllers');

const router = express.Router();

// Mapping only. The paths are relative, because server.js already mounted
// this router at /api/books. No business logic belongs in a routes file.
router.get('/', Controllers.booksController.getAllBooks);
router.get('/:id', Controllers.booksController.getBookById);

module.exports = router;
