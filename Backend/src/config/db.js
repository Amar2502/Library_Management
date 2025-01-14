import mongoose from "mongoose" 
import config from "./config.js";

const connectDB = async () => {
    try {
      await mongoose.connect(config.MONGO_URI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      process.exit(1); // Exit process with failure
    }
  };

export default connectDB;