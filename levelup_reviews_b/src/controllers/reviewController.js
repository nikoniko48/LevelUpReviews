const db = require('../../db');

exports.deleteReview = (req, res) => {
    const reviewId = req.params.id;

    const query = `
        DELETE FROM Recenzja
        WHERE id = ? 
    `;

    db.query(query, [reviewId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Failed to delete review" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Review not found or not authorized" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    });
};
