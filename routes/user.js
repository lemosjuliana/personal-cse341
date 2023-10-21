const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');
const validation = require('../middleware/validate');

router.get('/', usersController.getAllUsers);
router.post('/', validation.saveUser, usersController.createUser);
router.put('/:id', validation.saveUser, usersController.updateUser);
// router.get('/:username', usersController.getSingleUser);  
router.delete('/:id', usersController.deleteUser);

module.exports = router;
