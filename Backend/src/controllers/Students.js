import Student from "../models/Students.model.js";
import Event from "../models/Event.model.js";
import hashpass from "../utils/hashpass.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const RegisterStudent = async (req, res) => {
  const { name, prn, branch, role, password, year } = req.body;
  console.log("data collected");
  try {
    const existingStudent = await Student.findOne({ prn });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const hashedPassword = await hashpass(password);

    const newStudent = new Student({
      name,
      prn,
      branch,
      role,
      password: hashedPassword,
      year,
    });

    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const LoginStudent = async (req, res) => {
  const { prn, password } = req.body;

  const student = await Student.findOne({ prn });
  if (!student) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const ismatch = await bcrypt.compare(password, student.password);
  if (ismatch == false) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const token = jwt.sign(
    { prn: student.prn, role: student.role },
    config.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Strict",
    maxAge: 3600000, // 1 hour in milliseconds
  });

  return res.status(200).json({
    message: "student Logged In successfully",
    token: token,
  });
};

export const StudentDetail = async (req, res) => {
  const { prn } = req.body;

  const student = await Student.findOne({ prn });

  if (!student) {
    return res.status(400).json({ message: "Student Not found" });
  }

  return res.status(200).json({
    message: "student Logged In successfully",
    name: student.name,
    prn: student.prn,
    branch: student.branch,
    year: student.year,
    issuedBook: student.issuedBook,
  });
};

// export const AddBook = async (req, res) => {
//   const { prn, book_id } = req.body;
//   try {
//     const student = await Student.findOne({ prn });
//     if (!student) {
//       return res.status(400).json({ message: "Student Not found" });
//     }
//     const book = await Book.findOne({ book_id });
//     if (!book) {
//       return res.status(400).json({ message: "Book Not found" });
//     }
//     const issuedbook = {
//       name: book.name,
//       book_id: book.book_id,
//     };
//     book.inshelf = book.inshelf - 1;
//     book.issued = book.issued + 1;

//     await book.save();
//     student.issuedBook.push(issuedbook);

//     await student.save();
//     return res.status(200).json({
//       message: "Book issued successfully",
//     });
//   } catch (err) {
//     console.error("Error while adding book:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

export const checkStudent = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, config.JWT_SECRET);

  return res.status(200).json({
    message: "User is Student",
    prn: decoded.prn
  });
};

// export const ReturnBook = async (req, res) => {
//   try {
//     const { prn, book_id } = req.body;

//     // Find the student
//     const student = await Student.findOne({ prn });
//     if (!student) {
//       return res.status(400).json({ message: "Student Not found" });
//     }

//     const book = await Book.findOne({ book_id });
//     if (!book) {
//       return res.status(400).json({ message: "Book Not found" });
//     }

//     book.inshelf = book.inshelf + 1;
//     book.issued = book.issued - 1;

//     await book.save();

//     if (!Array.isArray(student.issuedBook)) {
//       return res.status(400).json({ message: "Issued books data is invalid" });
//     }

//     const index = student.issuedBook.findIndex(
//       (book) => book.book_id === book_id
//     );

//     if (index === -1) {
//       return res.status(404).json({ message: "Book not found in issued list" });
//     }

//     const removed = student.issuedBook.splice(index, 1);

//     await student.save();

//     return res.status(200).json({ message: "Book returned successfully" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "An error occurred", error: error.message });
//   }
// };
