// Importing Dependencies:
const mongodb = require('../db/connect'); // is a reference to my database connection
const ObjectId = require('mongodb').ObjectId; // is a type provided by the MongoDB driver. Allows me to work with MongoDB's unique identifiers.

// Centralized error response function
function errorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
}

// Function that handles a GET request.
const getAllUsers = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('Vet').collection('users').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Get single user by id
const getSingleUser = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('Vet').collection('users').find({ _id: userId }).toArray();
    res.setHeader('Content-Type', 'application/json');
    if (!result[0]) {
      return errorResponse(res, 404, 'User not found');
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    if (!req.oidc.isAuthenticated()) {
      return errorResponse(res, 401, 'Unauthorized. Please login to create a user.');
    }

    const user = req.body;
    const response = await mongodb.getDb().db('Vet').collection('users').insertOne({ user });

    if (response.acknowledged) {
      const newUserId = response.insertedId;
      res.status(201).json({ message: 'User created successfully', userId: newUserId });
    } else {
      errorResponse(res, 500, 'Failed to create user');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Update user by id
const updateUser = async (req, res) => {
  try {
    if (!req.oidc.isAuthenticated()) {
      return errorResponse(res, 401, 'Unauthorized. Please login to update a user.');
    }

    const userId = new ObjectId(req.params.id);
    const updatedUserData = req.body;
    const result = await mongodb.getDb().db('Vet').collection('users').updateOne(
      { _id: userId },
      { $set: { user: updatedUserData } }
    );

    if (result.modifiedCount > 0) {
      res.status(204).json({ message: 'User updated successfully' });
    } else {
      errorResponse(res, 404, 'User not found');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Delete a single user
const deleteUser = async (req, res) => {
  try {
    if (!req.oidc.isAuthenticated()) {
      return errorResponse(res, 401, 'Unauthorized. Please login to delete a user.');
    }

    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('Vet').collection('users').deleteOne({ _id: userId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      errorResponse(res, 404, 'User not found');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = { getAllUsers, getSingleUser, getUserByUsername, createUser, updateUser, deleteUser };