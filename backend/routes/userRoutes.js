const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile', authMiddleware, UserController.getProfile);
router.put('/profile', authMiddleware, UserController.updateProfile);
router.delete('/profile', authMiddleware, UserController.deleteProfile);

module.exports = router;
