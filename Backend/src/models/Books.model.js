import mongoose from "mongoose";

// Define the book schema
const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    book_id: {
      type: String,
      required: true,
      unique: true, // Unique identifier for the book
    },
    inshelf: {
      type: Number,
      required: true,
      min: [0, "Number of books on the shelf cannot be negative"],
    },
    issued: {
      type: Number,
      default: 0,
      min: [0, "Number of issued books cannot be negative"],
      validate: {
        validator: function (value) {
          return value <= this.inshelf; // Ensure issued <= inshelf
        },
        message: "Number of issued books cannot exceed books on the shelf",
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create a model from the schema
const Book = mongoose.model("Book", bookSchema);

export default Book;
