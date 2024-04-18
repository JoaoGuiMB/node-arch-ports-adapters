import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://root:example@localhost:27017/root?authSource=admin";

// try to add mongodb-memory-server here

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  dbName: "test",
});

export default mongoose;
