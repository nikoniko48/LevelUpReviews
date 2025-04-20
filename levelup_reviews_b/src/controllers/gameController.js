const db = require('../../db');

exports.getAllGames = (req, res) => {
    const query = `
        SELECT
            Gra.id,
            Gra.tytul,
            Gra.producent,
            Gra.data_wydania,
            Gra.img_path,
            AVG(Recenzja.ocena) AS srednia_ocena
        FROM Gra
                 JOIN Recenzja ON Recenzja.gra_id = Gra.id
        GROUP BY Gra.id, Gra.tytul, Gra.producent, Gra.data_wydania, Gra.img_path;
    `;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Błąd pobierania recenzji' });
        } else {
            res.json(results);
        }
    });
};

exports.getGameDetails = (req, res) => {
    const gameId = req.params.id;
    const query = `
        SELECT
            Gra.id,
            Gra.tytul AS title,
            Gra.producent AS producer,
            Gra.data_wydania AS releaseDate,
            Gra.img_path AS image,
            AVG(Recenzja.ocena) AS rating,
            GROUP_CONCAT(
                    JSON_OBJECT(
                            'id', Recenzja.id,
                            'text', Recenzja.tresc,
                            'user', Uzytkownik.nazwa_uzytkownika,
                            'rating', Recenzja.ocena,
                            'date', DATE_FORMAT(Recenzja.data_utworzenia, '%d.%m.%Y')
                    )
            ) AS reviews
        FROM Gra
                 JOIN Recenzja ON Recenzja.gra_id = Gra.id
                 JOIN Uzytkownik ON Recenzja.uzytkownik_id = Uzytkownik.id
        WHERE Gra.id = ?
        GROUP BY Gra.id;
    `;

    db.query(query, [gameId], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error fetching game details" });
        } else if (results.length === 0) {
            res.status(404).json({ error: "Game not found" });
        } else {
            const game = results[0];
            game.reviews = JSON.parse(`[${game.reviews}]`);
            res.json(game);
        }
    });
};

exports.addReview = (req, res) => {
    const gameId = req.params.id;
    const userId = req.user.id;
    const { text, rating } = req.body;

    if (rating === undefined || rating < 0 || rating > 5) {
        return res.status(400).json({ error: "Valid rating (0-5) required." });
    }

    if (text === undefined || text === "" || text.length > 300) {
        return res.status(400).json({ error: "Valid text (1-300 characters) required." });
    }

    const query = `
        INSERT INTO Recenzja (gra_id, uzytkownik_id, tresc, ocena, data_utworzenia)
        VALUES (?, ?, ?, ?, NOW())
    `;
    db.query(query, [gameId, userId, text, rating], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Failed to add review" });
        }
        res.status(201).json({ message: "Review added successfully" });
    });
};

exports.addGame = (req, res) => {
    const { title, producer, releaseDate, category, imagePath } = req.body;

    if (!title || !producer || !releaseDate || !category || !imagePath) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (req.user.rola !== "admin") {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const gameQuery = `
        INSERT INTO Gra (tytul, producent, data_wydania, kategoria, img_path)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(gameQuery, [title, producer, releaseDate, category, imagePath], (err, gameResults) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Failed to add game." });
        }

        const gameId = gameResults.insertId;

        const reviewQuery = `
            INSERT INTO Recenzja (gra_id, uzytkownik_id, tresc, ocena, data_utworzenia)
            VALUES (?, ?, ?, ?, NOW())
        `;
        const placeholderReview = {
            userId: req.user.id,
            text: "This is a placeholder review for the new game.",
            rating: 5,
        };

        db.query(
            reviewQuery,
            [gameId, placeholderReview.userId, placeholderReview.text, placeholderReview.rating],
            (reviewErr) => {
                if (reviewErr) {
                    console.error("Failed to add placeholder review:", reviewErr);
                    return res.status(500).json({
                        error: "Game added, but failed to add placeholder review.",
                    });
                }

                res.status(201).json({
                    message: "Game and placeholder review added successfully",
                    gameId,
                });
            }
        );
    });
};



