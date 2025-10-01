// server.js

const app = require("./app"); // Import Express app (API routes)
const path = require("path");

const PORT = process.env.PORT || 3000; // Use environment port or default 3000

// Serve static frontend files from the 'public' folder
app.use(require("express").static(path.join(__dirname, "public")));

// Serve main HTML file for root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start server and log the URL
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));



