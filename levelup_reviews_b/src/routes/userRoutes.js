const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {verifyToken} = require("../middlewares/jwtMiddleware");
const {getProfile} = require("../controllers/userController");

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get("/profile", verifyToken, getProfile);
router.put("/username", verifyToken, userController.updateUsername);

module.exports = router;
