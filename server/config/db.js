import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/edupath_ai');
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database] Error: ${error.message}`);
    console.log(`[Database] Running without database (Hackathon Mode - In Memory Mocking Enabled)`);
  }
};

export default connectDB;
