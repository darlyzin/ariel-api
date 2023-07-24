import express from "express";
import { Router } from "express";
import fs from "fs";

const app = express();

const route = Router();
const PORT = 4000;
const PASSWORD = "ariel?=api";

const password = (req, res, next) => {
  const { password } = req.query;

  if (!password || password !== PASSWORD) {
    return res
      .status(401)
      .json({ error: "Ops, senha inválida, tente novamente..." });
  }

  next();
};

route.get("/kiss/images", password, (req, res) => {
  const { kissJSON } = JSON.parse(
    fs.readFileSync("./service/images.json", "utf8")
  );

  let randomGif = kissJSON[Math.floor(Math.random() * kissJSON.length)];

  return res.json(randomGif);
});

route.get("/hug/images", password, (req, res) => {
  const { hugJSON } = JSON.parse(
    fs.readFileSync("./service/images.json", "utf8")
  );

  let randomGif = hugJSON[Math.floor(Math.random() * hugJSON.length)];

  return res.json(randomGif);
});

app.use(route);

app.listen(PORT, () => {
  console.log(`API de memes rodando em http://localhost:${PORT}`);
});
