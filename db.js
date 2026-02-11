const  mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/Hotels";

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
// sumit
module.exports = db;
