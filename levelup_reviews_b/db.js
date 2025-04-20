const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3300,
    user: 'tin2024',
    password: 'tin2024',
    database: 'myTINdatabase',
});

db.connect((err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err);
    } else {
        console.log('Połączono z bazą danych.');
    }
});

module.exports = db;
