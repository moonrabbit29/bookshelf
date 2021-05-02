const { nanoid } = require('nanoid');
let books = require('../model/books');

const addBookController = (req, res) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.body;
  if (!name) {
    res.status(400);
    res.json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    return res.send();
  }
  if (readPage > pageCount) {
    res.status(400);
    res.json({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    return res.send();
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage);

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  books.push(newBook);
  let flag = 0;
  books.filter((book) => {
    if (book.id === id) {
      res.status(201);
      res.json({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      flag = 1;
      return book;
    }
    return book;
  });
  if (flag) {
    return res.send();
  }

  res.status(500);
  res.json({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  return res.send();
};

const getAllBookController = (req, res) => {
  res.json({
    status: 'success',
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  res.status(200);
  return res.send();
};

const getBookDetailController = (req, res) => {
  const { id } = req.params;
  const book = books.filter((b) => b.id === id)[0];

  if (book) {
    res.status(200);
    res.json({
      status: 'success',
      data: {
        book,
      },
    });
    return res.send();
  }
  res.status(404);
  res.json({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  return res.send();
};

const editBookController = (req, res) => {
  const { id } = req.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.body;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    if (!name) {
      res.status(400);
      res.json({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      return res.send();
    }
    if (readPage > pageCount) {
      res.status(400);
      res.json({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      return res.send();
    }
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished: pageCount === readPage,
      reading,
      updatedAt,
    };
    res.status(200);
    res.json({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    return res.send();
  }
  res.status(404);
  res.json({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  return res.send();
};

const deleteBookController = (req, res) => {
  const { id } = req.params;
  const len = books.length;
  books = books.filter((item) => item.id !== id);
  if (books.length !== len) {
    res.status(200);
    res.json({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    return res.send();
  }
  res.status(404);
  res.json({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  return res.send();
};

module.exports = {
  addBookController,
  getAllBookController,
  getBookDetailController,
  editBookController,
  deleteBookController,
};
