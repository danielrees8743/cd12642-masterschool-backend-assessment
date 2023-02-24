//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require('express-async-handler');
const FavoritePhoto = require('../models/favoritePhotoModel');

//- POST /api/favorites
//- Add photo to favorites
//- Private
exports.addToFavorites = asyncHandler(async (req, res) => {
  const { user, photoUrl, description, username, explanation } = req.body;

  if (!user || !photoUrl || !description || !username || !explanation) {
    res.status(400);
    throw new Error('Please make sure that all fields are completed');
  }

  const newPhoto = await FavoritePhoto.create({
    user,
    photoUrl,
    description,
    username,
    explanation,
  });

  res.status(200).json({ Message: 'Added to Favorites', newPhoto });
});

//- GET /api/favorites
//- Get all favorites
//- Private
exports.getFavorites = asyncHandler(async (req, res) => {
  const favorites = await FavoritePhoto.find({ user: req.user._id }).select(
    '-__v'
  );

  res.status(200).json({ favorites });
});

//- DELETE /api/favorites/:id
//- Delete photo from favorites
//- Private
exports.deleteFromFavorites = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ message: 'Please make sure that all fields are completed' });
  }
  const photo = await FavoritePhoto.findByIdAndDelete(id);
  if (!photo)
    return res.status(404).json({
      message: 'Opps, Could not delete favorite 🥹, it could not be found',
    });

  //* This should be 204, but 204 would not display anything in the response body. So I used 200 to show a success message.
  res.status(200).json({ message: 'Removed from favorites' });
});

//- POST /api/favorites/:id
//- Update photo in favorites
//- Private
exports.updateFavorites = asyncHandler(async (req, res) => {
  const { id, explanation } = req.body;
  if (!id || !explanation) {
    return res.status(400).json({
      message: 'Please add the ID AND explanation to update your favorite 💔',
    });
  }

  console.log('update', req.body);

  const favorite = await FavoritePhoto.findByIdAndUpdate(
    id,
    {
      explanation,
    },
    {
      new: true,
    }
  ).select('-__v');

  if (!favorite) {
    res.status(404);
    throw new Error('Opps, Could not update your favorite 😭');
  }
  res.status(200).json({
    message: 'Whoop, Whoop! Updated your favorite photo 😁',

    favorite,
  });
});
