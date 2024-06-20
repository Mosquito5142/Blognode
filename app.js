const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('./connection'); // Import the connection
const postsRoutes = require('./routes/posts'); // Import posts routes
const usersRoutes = require('./routes/users'); // Import users routes
const bodyParser = require('body-parser')

app.use(cors()); // Enable CORS for cross-origin requests

// Use the routes
app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);


app.listen(3000, () => {
  console.log('CORS-enabled web server listening on port 3000');
});
