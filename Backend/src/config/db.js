import mongoose from "mongoose" 
import config from "./config.js";

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      });

      console.log(`MongoDB Atlas connected: ${conn.connection.host}`);

      // Handle connection events
      mongoose.connection.on('error', err => {
        console.error('MongoDB connection error:', err);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
      });

      // Handle process termination
      process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
      });

    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      process.exit(1);
    }
};

export default connectDB;