// server.js

const app = require("./app");
const path = require("path");

const PORT = process.env.PORT || 3000;

// Serve frontend files
app.use(require("express").static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
