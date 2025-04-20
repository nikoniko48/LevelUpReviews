const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/jwtMiddleware");
const reviewController = require("../controllers/reviewController");

router.delete("/:id", verifyToken, reviewController.deleteReview);

module.exports = router;
