const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGO_CONNECTION;
// const mongo_URL = process.env.MONGO_CONNECTION_URL|| 'mongodb://localhost:27017/hotel';
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

module.exports = db;
