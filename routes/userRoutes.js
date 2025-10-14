const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authmiddleware'); 
router.post('/register', userController.createUser);
router.get('/:id', authMiddleware, userController.getUser);
router.post('/login', userController.loginUser);

module.exports = router;