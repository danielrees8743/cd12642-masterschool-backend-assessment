const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const photoRouter = require('./routes/photoRoutes');

//* App config
const app = express();
const PORT = process.env.PORT || 3000;

//* Middleware
app.use(express.json());
app.use(morgan('dev'));
dotenv.config({ path: './env' });

//* Routes
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Unsplash API!',
  });
});

app.use('/api/photos', photoRouter);

//* Server & DB connection
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
