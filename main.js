const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

const authMiddleware = (req, res, next) => {
  const credential = req.query.credential;

  if (credential === "arielapi") {
    return next();
  }

  res.status(401).send("Ops... você não tem acesso.");
};

app.get("/kiss/images", authMiddleware, (req, res) => {
  const { kissJSON } = require("./service/images.json");
  let randomGif = kissJSON[Math.floor(Math.random() * kissJSON.length)];

  console.log(kissJSON);
  console.log(randomGif);
  res.json(randomGif);
});

app.listen(PORT, () => {
  console.log(`API de memes rodando em http://localhost:${PORT}`);
});
