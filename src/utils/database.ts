import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // mongodb connection string
    await mongoose.connect('mongodb://localhost:27017/url-shortener');
    console.log('mongoDB connected.');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connectDB();

export default connectDB;
