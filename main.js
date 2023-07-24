import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

app.get("/kiss/images", authMiddleware, (req, res) => {
  const { kissJSON } = JSON.parse(fs.readFileSync("./service/images.json", "utf8"));

  let randomGif = kissJSON[Math.floor(Math.random() * kissJSON.length)];

  res.json(randomGif);
});

app.get("/hug/images", authMiddleware, (req, res) => {
  const { hugJSON } = JSON.parse(fs.readFileSync("./service/images.json", "utf8"));

  let randomGif = hugJSON[Math.floor(Math.random() * hugJSON.length)];

  res.json(randomGif);
});

app.listen(PORT, () => {
  console.log(`API de memes rodando em http://localhost:${PORT}`);
});
