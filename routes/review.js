const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review');
const validation = require('../middleware/validate');

router.get('/', validation.saveReview, reviewController.getAllReviews);
router.get('/:id', validation.saveReview, reviewController.getSingleReview);
router.post('/', validation.saveReview, reviewController.createReview);
router.put('/:id', validation.saveReview, reviewController.updateReview);
router.delete('/:id', validation.saveReview,  reviewController.deleteReview);

module.exports = router;