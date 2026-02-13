const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');


const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


// Middleware to log requests
const logRequest = (req, res, next) => {``
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
  next();
};
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false }); // it is compalsery for authentication to work
app.get('/', function(req, res) {
    res.send("Welcome to Hotel");
});

// Import and use person routes
const personRoutes = require('./routes/personRoutes');
app.use('/person',localAuthMiddleware, personRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

