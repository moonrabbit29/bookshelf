const express = require('express');

const router = express.Router();

const {
  addBookController,
  getAllBookController,
  getBookDetailController,
  editBookController,
  deleteBookController,
} = require('./handler');

router.post('/books', addBookController);
router.get('/books', getAllBookController);
router.get('/books/:id', getBookDetailController);
router.put('/books/:id', editBookController);
router.delete('/books/:id', deleteBookController);
module.exports = router;
