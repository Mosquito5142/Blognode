const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const postsRoutes = require('./routes/posts'); // Import posts routes
const usersRoutes = require('./routes/users'); // Import users routes

app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json({ limit: '50mb' })); // Use body-parser middleware
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Use the routes
app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('CORS-enabled web server listening on port 3000');
});
