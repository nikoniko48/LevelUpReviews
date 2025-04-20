import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/ContentPane.css";
import "../assets/ProfilePanel.css";
import axios from "axios";

function Profile() {
    const [userData, setUserData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [newUsername, setNewUsername] = useState("");
    const reviewsPerPage = 3;

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You need to log in to view your profile.");
                return;
            }

            try {
                const response = await axios.get("/api/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                alert("Failed to fetch user profile.");
            }
        };

        fetchUserData();
    }, []);

    const handleUpdateUsername = async (updatedUsername) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You need to log in to update your username.");
            return;
        }

        if (!updatedUsername.trim()) {
            alert("Please enter a valid username.");
            return;
        }

        try {
            await axios.put(
                "/api/users/username",
                { newUsername: updatedUsername },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Username updated successfully!");

            const response = await axios.get("/api/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data);
        } catch (error) {
            console.error("Error updating username:", error);
            alert("Failed to update username.");
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    const totalPages = Math.ceil(userData.reviews.length / reviewsPerPage);
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const currentReviews = userData.reviews.slice(startIndex, startIndex + reviewsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDeleteReview = async (reviewId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You need to log in to delete a review.");
            return;
        }

        try {
            await axios.delete(`/api/reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Review deleted successfully!");

            const response = await axios.get("/api/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data);
        } catch (error) {
            console.error("Error deleting review:", error);
            alert("Failed to delete the review.");
        }
    };

    const xpPercentage = (userData.xp / userData.xpForNextLevel) * 100;

    return (
        <div className="profile-page">
            <Header />
            <div className="content-pane profile-container">
                <div className="profile-header">
                    <img
                        src={userData.profilePicture || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="profile-picture"
                    />
                    <div className="profile-info">
                        <h1 className="nickname">
                            {userData.nickname}
                            <button
                                className="edit-username-button"
                                onClick={() => {
                                    const newName = prompt(
                                        "Enter a new username:",
                                        userData.nickname
                                    );
                                    if (newName) {
                                        handleUpdateUsername(newName);
                                    }
                                }}
                            >
                                Edit
                            </button>
                        </h1>
                        <p className="stats">Reviews Left: {userData.totalReviews}</p>
                        <p className="stats">Level: {userData.level}</p>
                        <div className="xp-bar-container">
                            <div
                                className="xp-bar"
                                style={{ width: `${xpPercentage}%` }}
                            ></div>
                        </div>
                        <p className="xp-text">
                            XP: {userData.xp}/{userData.xpForNextLevel}
                        </p>
                    </div>
                </div>
                <div className="reviews-section">
                    <h2>Your Reviews</h2>
                    {currentReviews.map((review) => (
                        <div key={review.id} className="user-review">
                            <img
                                src={`../images/${review.gameImage}`}
                                alt={review.gameTitle}
                                className="game-miniature"
                            />
                            <div className="review-content">
                                <div className="review-left">
                                    <h3 className="game-title">{review.gameTitle}</h3>
                                    <p className="review-rating">Rating: {review.rating}/5</p>
                                    <p className="review-text">{review.text}</p>
                                </div>
                                <button
                                    className="delete-review-button"
                                    onClick={() => handleDeleteReview(review.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`page-button ${
                                    currentPage === i + 1 ? "active" : ""
                                }`}
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

export default Profile;
