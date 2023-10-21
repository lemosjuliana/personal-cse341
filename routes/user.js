const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getSingleUser);  
router.post('/', usersController.createUser);
// router.get('/:username', usersController.getSingleUser);  
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
