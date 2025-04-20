const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { verifyToken } = require('../middlewares/jwtMiddleware');

router.get('/', gameController.getAllGames);
router.get('/details/:id', gameController.getGameDetails);
router.post("/addGame", verifyToken, gameController.addGame);
router.post('/:id', verifyToken, gameController.addReview);


module.exports = router;
