const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
mongoose.set('strictQuery', true);

const DB = process.env.MONGO_URL.replace(
  '<password>',
  process.env.MONGO_PASSWORD
);

const DBConnection = async () => {
  try {
    const db = await mongoose.connect(DB);
    console.log(colors.yellow.italic(`Connected to MongoDB`));
    return db;
  } catch (error) {
    console.log(colors.red(`${error.message}`));
    process.exit(1);
  }
};

module.exports = DBConnection;
