//Require axios to make API calls
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const url = process.env.UNSPLASH_API_URL;
const key = process.env.UNSPLASH_ACCESS_KEY;

exports.getAllPhotos = async (req, res) => {
  try {
    const { data } = await axios.get(`${url}/photos?client_id=${key}`);
    const photos = data.map((photo) => photo.urls.raw);
    // res.status(200).json({ photos });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({
      message: 'Server error. Please try again later.',
    });
  }
};

exports.getPhotoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${url}/photos/${id}?client_id=${key}`);
    //note might need to put something in here to reduce the code. Seems a lot of code returned form the api! 😥
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
