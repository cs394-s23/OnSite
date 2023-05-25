const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
};

module.exports = cors(corsOptions);

const express = require('express');
const cors = require('./cors.js'); // Import the cors configuration file

const app = express();

// Use the CORS middleware
app.use(cors);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});