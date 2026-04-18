require("dotenv").config(); // MUST be first

const app = require("./src/app");
const connectDB = require("./src/config/db");

// Connect Database
connectDB();

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

console.log("MONGO_URI:", process.env.MONGO_URI);