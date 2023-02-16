//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require('express-async-handler');
const FavoritePhoto = require('../models/favoritePhotoModel');

// POST /api/favorites
// Add photo to favorites
// Private
exports.addToFavorites = asyncHandler(async (req, res) => {
  const { user, photoUrl, description, username, explanation } = req.body;
  console.log(user, photoUrl, description, username, explanation);
  try {
    const newPhoto = await FavoritePhoto.create({
      user,
      photoUrl,
      description,
      username,
      explanation,
    });

    res.status(200).json({
      newPhoto,
      message: 'Added to you favorites',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error. Please try again later.',
    });
  }
});

// GET /api/favorites
// Get all favorites
// Private
exports.getFavorites = asyncHandler(async (req, res) => {
  try {
    const favorites = await FavoritePhoto.find({ user: req.user._id });
    res.status(200).json({ favorites });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error. Please try again later.',
    });
  }
});

// DELETE /api/favorites/:id
// Delete photo from favorites
// Private
exports.deleteFromFavorites = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const photo = await FavoritePhoto.findOneAndDelete(id);
    if (photo) {
      await photo.remove();
      res.status(204).json({
        message: 'Photo removed from favorites',
      });
    } else {
      res.status(404).json({
        message: 'Photo not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error. Please try again later.',
    });
  }
});

// POST /api/favorites/:id
// Update photo in favorites
// Private
exports.updateFavorites = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const favorite = await FavoritePhoto.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(favorite);
    if (!favorite) {
      res.status(404).json({
        message: 'Photo not found',
      });
    }
    res.status(200).json({
      favorite,
      message: 'Photo updated',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error. Please try again later.',
    });
  }
});
