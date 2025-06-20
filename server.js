const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve static files like HTML, CSS, images from root directory
app.use(express.static(__dirname));

// Save form data to songs.json
app.post("/submit-song", (req, res) => {
  const newEntry = req.body;
  const filePath = path.join(__dirname, "songs.json");

  let data = [];
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath);
    data = JSON.parse(rawData);
  }

  data.push(newEntry);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json({ message: "Data saved successfully!" });
});

// Serve saved song data
app.get("/get-songs", (req, res) => {
  const filePath = path.join(__dirname, "songs.json");

  if (!fs.existsSync(filePath)) {
    return res.json([]);
  }

  const rawData = fs.readFileSync(filePath);
  const data = JSON.parse(rawData);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
