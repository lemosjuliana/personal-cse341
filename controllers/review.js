const Review = require('../models/review');

// GET all reviews
const getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.find();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // POST a new review
  const createReview = async (req, res) => {
    const { title, content, userId } = req.body;
  
    try {
      const newReview = new Review({
        title,
        content,
        userId,
      });
  
      await newReview.save();
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getAllReviews,
    createReview,
  };