const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const DBconnection = require('./config/db');

const photoRouter = require('./routes/photoRoutes');
const userRoutes = require('./routes/userRoutes');

//* App config
dotenv.config({ path: '.env' });
const app = express();
const PORT = process.env.PORT || 3000;

//* Middleware
app.use(express.json());
app.use(morgan('dev'));

//* Routes
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Unsplash API!',
  });
});

app.use('/api/photos', photoRouter);
app.use('/api/users', userRoutes);

//* Server & DB connection
app.listen(PORT, () => {
  DBconnection();
  console.log(colors.italic.cyan(`Listening on port ${PORT}`));
});
