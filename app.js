const express = require("express");
const path = require("path");
const fs = require("fs").promises;

const app = express();
const PORT = 3000;

let words = [];

// Read the text file and split it into an array of words
fs.readFile(path.resolve(__dirname, "words.txt"), "utf8")
  .then(data => {
    words = data.split(/\s+/);
  })
  .catch(err => {
    console.error("Error reading file:", err);
  });

app.use(express.static(path.resolve(__dirname, "public")));

//Creating a router to return a word
app.get('/word', (req, res) => {
  const word = words[Math.floor(Math.random() * words.length)];
  res.json({ word });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
