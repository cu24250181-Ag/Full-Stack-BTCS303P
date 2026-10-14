const express = require("express");
const router = express.Router();

let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "1984", author: "George Orwell" }
];

// GET /api/books
router.get("/", (req, res) => {
  res.json(books);
});

// GET /api/books/:id
router.get("/:id", (req, res, next) => {
  const book = books.find((item) => item.id === Number(req.params.id));

  if (!book) {
    const error = new Error("Book not found");
    error.status = 404;
    return next(error);
  }

  res.json(book);
});

// POST /api/books
router.post("/", (req, res) => {
  const book = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    ...req.body
  };

  books.push(book);
  res.status(201).json(book);
});

// PUT /api/books/:id
router.put("/:id", (req, res, next) => {
  const index = books.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    const error = new Error("Book not found");
    error.status = 404;
    return next(error);
  }

  books[index] = { ...books[index], ...req.body, id: books[index].id };
  res.json(books[index]);
});

// DELETE /api/books/:id
router.delete("/:id", (req, res, next) => {
  const index = books.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    const error = new Error("Book not found");
    error.status = 404;
    return next(error);
  }

  const deletedBook = books.splice(index, 1)[0];
  res.json(deletedBook);
});

module.exports = router;
