const express = require('express');
const photoController = require('../controllers/photoController');

const router = express.Router();

router.get('/', photoController.getAllPhotos);

router.get('/:id', photoController.getPhotoById);

module.exports = router;
