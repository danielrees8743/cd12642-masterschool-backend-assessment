const express = require('express');
const favoritesController = require('../controllers/favoritesController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .post(authMiddleware.verifyToken, favoritesController.addToFavorites)
  .get(authMiddleware.verifyToken, favoritesController.getFavorites);

router
  .route('/:id')
  .delete(authMiddleware.verifyToken, favoritesController.deleteFromFavorites)
  .patch(authMiddleware.verifyToken, favoritesController.updateFavorites);

module.exports = router;
