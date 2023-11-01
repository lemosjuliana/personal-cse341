const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review');
const validation = require('../middleware/validate');
const { requiresAuth } = require('../middleware/authenticate'); 
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getSingleReview);
router.post('/', requiresAuth(), validation.saveReview, reviewController.createReview); 
router.put('/:id', validation.saveReview, reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
