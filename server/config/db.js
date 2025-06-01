////Now, app.js will import the database connection instead of handling it directly. in app.js
const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables

const pool = new Pool({
  user: process.env.DB_USER || "your_default_user",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "your_database",
  password: process.env.DB_PASSWORD || "your_password",
  port: process.env.DB_PORT || 5432,
});

pool.connect()
  .then(client => {
    console.log("✅ Database Connected Successfully");
    client.release();
  })
  .catch(err => console.error("❌ Database Connection Error:", err));

module.exports = pool;
