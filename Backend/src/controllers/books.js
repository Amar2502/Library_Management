import Book from "../models/Books.model.js";

export const AddBooks = async (req, res) => {
  const { name, book_id, inshelf, issued } = req.body;

  try {
    const existingBook = await Book.findOne({ book_id });
    if (existingBook) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newBook = new Book({
      name,
      book_id,
      inshelf,
      issued,
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const GetBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(201).json({
      message: "Book added successfully!",
      books,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
