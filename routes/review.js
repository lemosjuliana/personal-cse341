const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review');
const validation = require('../middleware/validate');

router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getSingleReview);
router.post('/', validation.saveReview, reviewController.createReview);
router.put('/:id', validation.saveReview, reviewController.updateReview);
router.delete('/:id',  reviewController.deleteReview);

module.exports = router;