const express = require('express');
const bodyParser = require('body-parser');
const gameRoutes = require('./src/routes/gameRoutes');
const userRoutes = require('./src/routes/userRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/reviews', gameRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = 3301;

app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});


module.exports = app;
