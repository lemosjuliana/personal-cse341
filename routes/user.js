const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getSingleUser);
router.post('/', usersController.createUser);
//router.put('/:id', usersController.updateContact);
//router.delete('/:id', usersController.deleteContact);

module.exports = router;
