const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');

router.get('/', usersController.getAllUsers);
router.get('/:username', usersController.getSingleUser);
router.post('/', usersController.createUser);
// router.put('/:id', usersController.updateUser);
// router.delete('/:id', usersController.deleteUser);

module.exports = router;
