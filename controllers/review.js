// Importing Dependencies:
const mongodb = require('../db/connect'); // is a reference to my database connection
const ObjectId = require('mongodb').ObjectId; // is a type provided by the MongoDB driver. Allows me to work with MongoDB's unique identifiers.

// Centralized error response function
function errorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
}

// Function that handles a GET request.
const getAllReviews = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('Vet').collection('reviews').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Gets a single review
const getSingleReview = async (req, res, next) => {
  try {
    const reviewId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('Vet').collection('reviews').find({ _id: reviewId }).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Create a POST const 
const createReview = async (req, res) => {
  try {
    const review = req.body;
    const response = await mongodb.getDb().db('Vet').collection('reviews').insertOne({ review });

    if (response.acknowledged) {
      const newReviewId = response.insertedId;
      res.status(201).json({ message: 'Review created successfully', reviewId: newReviewId });
    } else {
      errorResponse(res, 500, 'Failed to create Review');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Function that handles a PUT request to update a review.
const updateReview = async (req, res, next) => {
  try {
    const reviewId = new ObjectId(req.params.id);
    const updatedReview = req.body;

    const response = await mongodb.getDb().db('Vet').collection('reviews').updateOne({ _id: reviewId }, { $set: updatedReview });

    if (response.matchedCount === 1 && response.modifiedCount === 1) {
      res.status(204).json({ message: 'Review updated successfully' });
    } else {
      errorResponse(res, 404, 'Review not found or not updated');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Function that handles a DELETE request.
const deleteReview = async (req, res, next) => {
  try {
    const reviewId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('Vet').collection('reviews').deleteOne({ _id: reviewId });

    if (response.deletedCount === 1) {
      res.status(200).json({ message: 'Review deleted successfully' });
    } else {
      errorResponse(res, 404, 'Review not found');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = { getAllReviews, getSingleReview, createReview, updateReview, deleteReview };