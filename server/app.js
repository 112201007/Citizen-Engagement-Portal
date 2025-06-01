const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./config/db");                    // Import database connection
const issueRoutes = require("./routes/issueRoutes");    // Import issue routes
const workerRoutes = require("./routes/workerRoutes");  // Import worker routes
const citizenRoutes = require("./routes/citizenRoutes");
const adminRoutes = require("./routes/adminRoutes");
const registerRoutes = require('./routes/registerRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Connected Successfully..");
});

// Use routes
app.use("/api", citizenRoutes);
app.use("/issues", issueRoutes);
app.use("/worker", workerRoutes);
app.use("/admin", adminRoutes);
app.use('/register', registerRoutes);
app.use('/statistics', statisticsRoutes);




app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});





