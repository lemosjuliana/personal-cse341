// Importing Dependencies:
const mongodb = require('../db/connect'); // is a reference to my database connection
const ObjectId = require('mongodb').ObjectId; // is a type provided by the MongoDB driver. Allows me to work with MongoDB's unique identifiers.

// Function that handles a GET request.
const getAllReviews = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('Vet').collection('reviews').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  
// Gets a single review
const getSingleReview = async (req, res, next) => {
  try {
    const reviewId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('Vet')
      .collection('reviews')
      .find({ _id: reviewId })
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a POST 
const createReview = async (req, res) => {
  try {
    const review = req.body; // Assuming req.body contains the user data

    const response = await mongodb.getDb().db('Vet').collection('reviews').insertOne({ review });

    if (response.acknowledged) {
      res.status(201).json({ message: 'Review created successfully' });
    } else {
      res.status(500).json({ error: 'Failed to create Review' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  
  module.exports = { getAllReviews, getSingleReview, createReview };