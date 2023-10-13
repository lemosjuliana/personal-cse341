const db = require('../models');
const User = db.user;
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  const user = new User(req.body);
  user
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the user.'
      });
    });
};

exports.getAll = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.'
      });
      return;
    }

    // Extracting user data from the array of objects
    const userData = users.map(user => user.user);

    res.send(userData);
  });
};


exports.getUser = (req, res) => {
  const username = req.params.username;
  User.find({ username: username })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.'
      });
    });
};
  
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