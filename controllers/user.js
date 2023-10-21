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
    const userId = new ObjectId(req.params.id);  // Assuming the parameter is called 'id'
    const result = await mongodb
      .getDb()
      .db('Vet')
      .collection('users')
      .find({ _id: userId })
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    if (!result[0]) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const createUser = async (req, res) => {
  try {
    const user = req.body; // Assuming req.body contains the user data

    const response = await mongodb.getDb().db('Vet').collection('users').insertOne({ user });

    if (response.acknowledged) {
      const newUserId = response.insertedId; // Get the new user ID
      res.status(201).json({ message: 'User created successfully', userId: newUserId });
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const updateUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);  // Assuming the parameter is called 'id'
    const updatedUserData = req.body; // Assuming req.body contains the updated user data

    const result = await mongodb
      .getDb()
      .db('Vet')
      .collection('users')
      .updateOne(
        { _id: userId },
        { $set: { user: updatedUserData } }
      );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);  // Assuming the parameter is called 'id'
    const result = await mongodb
      .getDb()
      .db('Vet')
      .collection('users')
      .deleteOne({ _id: userId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllUsers, getSingleUser, createUser, updateUser, deleteUser };
