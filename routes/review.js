const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review');

router.get('/', reviewController.getAllReviews);
router.get('/:id', usersController.getSingleReview);
router.post('/', reviewController.createReview);

module.exports = router;