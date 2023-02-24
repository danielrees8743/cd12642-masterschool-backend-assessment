const express = require('express');
const favoritesController = require('../controllers/favoritesController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(authMiddleware.verifyToken, favoritesController.getFavorites)
  .post(authMiddleware.verifyToken, favoritesController.addToFavorites)
  .delete(authMiddleware.verifyToken, favoritesController.deleteFromFavorites)
  .patch(authMiddleware.verifyToken, favoritesController.updateFavorites);

module.exports = router;
