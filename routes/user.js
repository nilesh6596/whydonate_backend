const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { verifyToken } = require('../middlewares/verifyToken');

router.post('/login', userController.userLogin);
router.get('/search', verifyToken, userController.getMoviesListByTitle);

module.exports = router;
