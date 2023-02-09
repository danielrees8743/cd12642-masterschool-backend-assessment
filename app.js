const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config({ path: '.config.env' });

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Unsplash API!',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
