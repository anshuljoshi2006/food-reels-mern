require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

console.log("Mongo URI exists:", !!process.env.MONGODB_URI);

connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB Error:", err));

module.exports = app;