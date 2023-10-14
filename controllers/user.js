// Importing Dependencies:
const mongodb = require('../db/connect'); // is a reference to my database connection
const ObjectId = require('mongodb').ObjectId; // is a type provided by the MongoDB driver. Allows me to work with MongoDB's unique identifiers.

// Function that handles a GET request.
const getAllUsers = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('Vet').collection('users').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  
const getSingleUser = async (req, res, next) => {
  try {
    const username = req.params.username; // Assuming the parameter is called 'username'
    const result = await mongodb
      .getDb()
      .db('Vet')
      .collection('users')
      .find({ username: username }) // Change the query to search by username
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Create a POST 
const createUser = async (req, res) => {
  try {
    const user = req.body; // Assuming req.body contains the user data

    const response = await mongodb.getDb().db('Vet').collection('users').insertOne({ user });

    if (response.acknowledged) {
      res.status(201).json({ message: 'User created successfully' });
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// I still have to create the PUT and DELETE functions (they are not required for Lesson 05)

module.exports = { getAllUsers, getSingleUser, createUser };


// module.exports = { getAllUsers, getSingleUser, createUser, updateUser, deleteUser };
  