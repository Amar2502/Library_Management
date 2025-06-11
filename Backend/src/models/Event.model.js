import mongoose from "mongoose";

// Define the book schema
const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      enum: ["Technical", "Cultural", "Sports", "Literature"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coordinatorName: {
      type: String,
      required: true,
    },
    coordinatorPhone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Invalid phone number"],
    },
    mode: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
    },
    venue: {
      type: String,
      required: function () {
        return this.mode === "Offline";
      },
    },
    dateTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create a model from the schema
const Event = mongoose.model("Event", eventSchema);

export default Event;
