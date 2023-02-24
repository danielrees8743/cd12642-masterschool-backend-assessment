const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const DBconnection = require('./config/db');

const photoRouter = require('./routes/photoRoutes');
const userRoutes = require('./routes/userRoutes');
const favoriteRoutes = require('./routes/favoritesRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

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
app.use('/api/favorites/', favoriteRoutes);
app.use(errorHandler);

//* Server & DB connection
// console.log(process.env.NODE_ENV);
app.listen(PORT, () => {
  DBconnection();
  console.log(colors.italic.cyan(`Listening on port ${PORT}`));
});
