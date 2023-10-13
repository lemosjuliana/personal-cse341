// Importing Dependencies:
const mongodb = require('../db/connect'); // is a reference to my database connection
const ObjectId = require('mongodb').ObjectId; // is a type provided by the MongoDB driver. Allows me to work with MongoDB's unique identifiers.

// Function that handles a GET request.
// It first retrieves the collection named 
// -contacts- from the database:
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

  
// Similar to -getAll- function.
const getSingleReview = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('Vet')
      .collection('reviews')
      .find({ _id: userId })
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a POST route for creating new contacts that returns the ID 
// of the new contact and a 201 status
const createReview = async (req, res) => {
  try {
    const contact = {
      rating: req.body.rating,
      comment: req.body.comment,
    };
    const response = await mongodb.getDb().db('Vet').collection('reviews').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  
  module.exports = { getAllReviews, getSingleReview, createReview };