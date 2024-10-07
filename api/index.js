require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./controllers/userController');
const problemController = require('./controllers/problemController');

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use Routes
app.use('/users', userController);
app.use('/problems', problemController);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
