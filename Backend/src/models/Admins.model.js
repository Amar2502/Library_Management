import mongoose from 'mongoose';

// Define the admin schema
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Email should be unique for each admin
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'superadmin'], // Admin can be either "admin" or "superadmin"
      default: 'admin', // Default to "admin"
    },
  }
);

// Create a model from the schema
const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
