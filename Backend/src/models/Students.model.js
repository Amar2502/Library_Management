import mongoose from "mongoose";

// Define the book schema
const issuedBookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  book_id: { type: String, required: true },
  issueDate: { type: Date, default: Date.now }, // Default to the current date
  returnDate: { 
    type: Date, 
    default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Default to 15 days from now
  },
  fine: { type: Number, default: 0 }, // Default fine is 0
});

// Define the student schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prn: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "student",
  },
  branch: {
    type: String,
    required: true,
    enum: ["CSE", "IT", "ECE", "ME", "EEE"],
  },
  password: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
    enum: ["1", "2", "3", "4"], // Year should be from 1st to 4th
  },
  issuedBook: [issuedBookSchema],
});

// Create a model from the schema
const Student = mongoose.model("Student", studentSchema);

export default Student;