const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const issueRoutes = require('./routes/issueRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/issues', issueRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});