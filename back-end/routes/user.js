const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.authenticate, userController.getAllUsers);
router.post('/', authMiddleware.authenticate, userController.createUser);
router.put('/:id', authMiddleware.authenticate, userController.updateUserById);

module.exports = router;