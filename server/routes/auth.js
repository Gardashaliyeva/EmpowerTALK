const express = require('express');

const { signup, login, updatePassword } = require('../controllers/auth.js');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/password', updatePassword);

module.exports = router;