const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./config/db");                    // Import database connection
const issueRoutes = require("./routes/issueRoutes");    // Import issue routes
const workerRoutes = require("./routes/workerRoutes");  // Import worker routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// pool.connect()
//   .then(client => {
//     console.log("✅ Connected Successfully");
//     client.release();
//   })
//   .catch(err => console.error("❌ Database Connection Error:", err));

app.get("/", (req, res) => {
  res.send("✅ Connected Successfully..");
});

// Use routes
app.use("/", issueRoutes);
app.use("/", workerRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});










