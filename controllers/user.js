// Importing Dependencies:
const mongodb = require('../db/connect'); // is a reference to my database connection
const ObjectId = require('mongodb').ObjectId; // is a type provided by the MongoDB driver. Allows me to work with MongoDB's unique identifiers.

// Function that handles a GET request.
// It first retrieves the collection named 
// -contacts- from the database:
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

  
// Similar to -getAll- function.
const getSingleUser = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('Vet')
      .collection('users')
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
const createUser = async (req, res) => {
  try {
    const user = {
      username: req.body.username,
      species: req.body.species,
      breed: req.body.breed,
      color: req.body.color,
      gender: req.body.gender,
      age: req.body.age
    };
    const response = await mongodb.getDb().db('Vet').collection('users').insertOne(user);
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

  module.exports = { getAllUsers, getSingleUser, createUser };
  // module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };

  

// // Create a PUT route for updating a contact that 
// // returns a 204 status
// const updateContact = async (req, res) => {
//   try {
//     const userId = new ObjectId(req.params.id);
//     const contact = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       favoriteColor: req.body.favoriteColor,
//       birthday: req.body.birthday
//     };
//     const response = await mongodb.getDb().db('Vet').collection('users').replaceOne({ _id: userId }, contact);
//     if (response.modifiedCount > 0) {
//       res.status(204).send();
//     } else {
//       res.status(500).json(response.error);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Create a DELETE route for deleting a contact that 
// // returns a 200 status

// const deleteContact = async (req, res) => {
//   try {
//     const userId = new ObjectId(req.params.id);
//     const response = await mongodb.getDb().db('Vet').collection('users').deleteOne({ _id: userId });
//     if (response.deletedCount > 0) {
//       res.status(200).send();
//     } else {
//       res.status(500).json(response.error);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
