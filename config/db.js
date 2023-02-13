const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
mongoose.set('strictQuery', true);

const DB = process.env.MONGO_URL.replace(
  '<password>',
  process.env.MONGO_PASSWORD
);
// const DB_PASSWORD = process.env.MONGO_PASSWORD;
// console.log(DB, DB_PASSWORD);

const DBConnection = async () => {
  try {
    const db = await mongoose.connect(DB);
    console.log(colors.yellow.italic(`Connected to MongoDB`));
    return db;
  } catch (error) {
    console.log(`Error connecting to MongoDB`);
  }
};

module.exports = DBConnection;
