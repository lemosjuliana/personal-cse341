const User = require('../models/user');

// GET all users
const getAll = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // POST a new user
  const createUser = async (req, res) => {
    const { username, email } = req.body;
  
    try {
      const newUser = new User({
        username,
        email,
      });
  
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { getAll, createUser };

  
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
//     const response = await mongodb.getDb().db('cse-341').collection('contacts').replaceOne({ _id: userId }, contact);
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
//     const response = await mongodb.getDb().db('cse-341').collection('contacts').deleteOne({ _id: userId });
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