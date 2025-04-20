import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/ContentPane.css";
import "../assets/AddGamePanel.css";
import axios from "axios";

function AddGame() {
    const handleAddGame = async (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const producer = document.getElementById("producer").value;
        const releaseDate = document.getElementById("releaseDate").value;
        const category = document.getElementById("category").value;
        const imagePath = document.getElementById("imagePath").value;

        if (!title || !producer || !releaseDate || !category || !imagePath) {
            alert("All fields are required.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in as an admin to add a game.");
                return;
            }

            const response = await axios.post(
                "/api/reviews/addGame",
                { title, producer, releaseDate, category, imagePath },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(response.data.message);

            document.getElementById("addGameForm").reset();
        } catch (error) {
            alert(error.response?.data?.error || "Failed to add game.");
        }
    };

    return (
        <div className="add-game-page">
            <Header />
            <div className="content-pane add-game-container">
                <h1 className="add-game-title">Add a New Game</h1>
                <form id="addGameForm" className="add-game-form" onSubmit={handleAddGame}>
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" id="title" placeholder="Enter the game title" className="form-input" />

                    <label htmlFor="producer" className="form-label">Producer</label>
                    <input type="text" id="producer" placeholder="Enter the producer name" className="form-input" />

                    <label htmlFor="releaseDate" className="form-label">Release Date</label>
                    <input type="date" id="releaseDate" className="form-input" />

                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" id="category" placeholder="Enter the game category" className="form-input" />

                    <label htmlFor="imagePath" className="form-label">Image Path</label>
                    <input type="text" id="imagePath" placeholder="Enter the image path" className="form-input" />

                    <button type="submit" className="add-game-button">Add Game</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default AddGame;
