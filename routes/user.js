const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/user'); 

router.get('/', getAll);
//router.post()

module.exports = router;
