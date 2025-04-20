import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../assets/ContentPane.css';
import '../assets/GameDetailsPanel.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

function GameDetails() {
    const { id } = useParams();
    const [gameData, setGameData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const reviewsPerPage = 5;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp > Date.now() / 1000) {
                    console.log(decoded);
                    setIsLoggedIn(true);
                    setIsAdmin(decoded.rola === "admin");
                } else {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem("token");
            }
        }

        const fetchGameDetails = async () => {
            try {
                const response = await axios.get(`/api/reviews/details/${id}`);
                setGameData(response.data);
            } catch (error) {
                console.error("Error fetching game details:", error);
            }
        };

        fetchGameDetails();
    }, [id]);

    const handleDeleteReview = async (reviewId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to delete a review.");
            return;
        }

        try {
            await axios.delete(`/api/reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Review deleted successfully!");

            const response = await axios.get(`/api/reviews/details/${id}`);
            setGameData(response.data);
        } catch (error) {
            console.error("Error deleting review:", error);
            alert("Failed to delete review.");
        }
    };
    console.log(gameData);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to submit a review.");
            return;
        }

        if (reviewRating < 0 || reviewRating > 5) {
            alert("Rating must be between 0 and 5.");
            return;
        }

        try {
            await axios.post(
                `/api/reviews/${id}`,
                { text: reviewText, rating: reviewRating },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Review submitted successfully!");
            setReviewText("");
            setReviewRating(0);

            const response = await axios.get(`/api/reviews/details/${id}`);
            setGameData(response.data);
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review.");
        }
    };

    if (!gameData) {
        return <div>Loading...</div>;
    }

    const startIndex = (currentPage - 1) * reviewsPerPage;
    const currentReviews = gameData.reviews.slice(startIndex, startIndex + reviewsPerPage);
    const totalPages = Math.ceil(gameData.reviews.length / reviewsPerPage);

    return (
        <div className="game-details-page">
            <Header />
            <div className="content-pane game-details-container">
                <h1 className="game-title">{gameData.title}</h1>
                <div className="game-info">
                    <img src={`../images/${gameData.image}`} alt={gameData.title} className="game-image" />
                    <div className="game-details">
                        <p className="game-rating">Average Rating: {parseFloat(gameData.rating).toFixed(1)}</p>
                        <p className="game-description">{gameData.description}</p>
                    </div>
                </div>
                <div className="reviews-section">
                    {isLoggedIn && (
                        <div className="add-review-section">
                            <h3>Add Your Review</h3>
                            <form onSubmit={handleReviewSubmit}>
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Write your review here..."
                                    className="review-textarea"
                                    rows="4"
                                />
                                <input
                                    type="number"
                                    value={reviewRating}
                                    onChange={(e) => setReviewRating(Number(e.target.value))}
                                    placeholder="Rate 0-5"
                                    min="0"
                                    max="5"
                                    className="review-rating-input"
                                />
                                <button type="submit" className="submit-review-button">
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    )}
                    <h2>Reviews</h2>
                    {currentReviews.map((review) => (
                        <div key={review.id} className="review">
                            <div className="review-user-text">
                                <p className="review-user">{review.user}</p>
                                <p className="review-text">{review.text}</p>
                            </div>
                            <div className="review-rating-date">
                                <p className="review-rating">Rating: {parseInt(review.rating)}/5</p>
                                <p className="review-date">{review.date}</p>
                            </div>
                            {isAdmin && (
                                <button
                                    className="delete-review-button"
                                    onClick={() => handleDeleteReview(review.id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))}
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default GameDetails;
