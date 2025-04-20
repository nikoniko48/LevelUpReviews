const bcrypt = require('bcrypt');
const db = require('../../db');


exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (username.length > 12) {
        return res.status(400).json({ error: 'Username must be 12 characters or fewer' });
    }

    if (password.length > 50) {
        return res.status(400).json({ error: 'Password must be 50 characters or fewer' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO Uzytkownik (nazwa_uzytkownika, email, haslo, rola)
            VALUES (?, ?, ?, 'user')
        `;
        db.query(query, [username, email, hashedPassword], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ error: 'Username or email already exists' });
                }
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
};


const jwt = require('jsonwebtoken');

exports.loginUser = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
        SELECT id, nazwa_uzytkownika, haslo, rola  FROM Uzytkownik WHERE nazwa_uzytkownika = ?
    `;
    db.query(query, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];

        const isPasswordValid = await bcrypt.compare(password, user.haslo);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, rola: user.rola },
            'kajsbnfcjklsnvjklwbvljnweklvnkjdvnksjdvkjsdbvkj',
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    });
};

exports.getProfile = (req, res) => {
    const userId = req.user.id;

    const userQuery = `
        SELECT id, nazwa_uzytkownika AS nickname, email,
               (SELECT COUNT(*) FROM Recenzja WHERE uzytkownik_id = ?) AS totalReviews
        FROM Uzytkownik
        WHERE id = ?
    `;

    const reviewsQuery = `
        SELECT Recenzja.id, Gra.img_path AS gameImage, Gra.tytul AS gameTitle,
               Recenzja.ocena AS rating, Recenzja.tresc AS text
        FROM Recenzja
                 JOIN Gra ON Recenzja.gra_id = Gra.id
        WHERE Recenzja.uzytkownik_id = ?
    `;

    db.query(userQuery, [userId, userId], (userErr, userResults) => {
        if (userErr) {
            return res.status(500).json({ error: "Database error fetching user profile" });
        }

        if (userResults.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const userData = userResults[0];
        const totalReviews = userData.totalReviews;

        let xp = totalReviews * 100;
        let level = 0;
        let xpForNextLevel = 300;

        while (xp >= xpForNextLevel) {
            level++;
            xp -= xpForNextLevel;
            xpForNextLevel += 100;
        }

        db.query(reviewsQuery, [userId], (reviewsErr, reviewResults) => {
            if (reviewsErr) {
                return res.status(500).json({ error: "Database error fetching user reviews" });
            }

            res.json({
                ...userData,
                level,
                xp,
                xpForNextLevel,
                reviews: reviewResults,
            });
        });
    });
};


exports.updateUsername = (req, res) => {
    const userId = req.user.id;
    const { newUsername } = req.body;

    if (!newUsername || newUsername.trim() === "") {
        return res.status(400).json({ error: "New username is required." });
    }

    const query = `
        UPDATE Uzytkownik
        SET nazwa_uzytkownika = ?
        WHERE id = ?
    `;

    db.query(query, [newUsername, userId], (err, results) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({ error: "Username already exists." });
            }
            console.error("Database error:", err);
            return res.status(500).json({ error: "Failed to update username." });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({ message: "Username updated successfully." });
    });
};
