const express = require("express");
const app = express();
const ejs = require("ejs");
const download = require("download");
const path = require("path");
const { host, PORT } = require("./config/config.js");

const { fetch, fetchAll } = require("./lib/database");

app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/post-link", async (req, res) => {
  const data = await fetch(
    `
      insert into audios(name) values ($1) returning *
    `,
    req.body.link
  );

  if (data.id) {
    download(data.name, "public/audios").then(() => {});
    res.redirect("http://localhost:3000/audios");
  }
});

app.get("/audios", async (req, res) => {
  const data = await fetchAll(
    `
      select * from audios order by id desc
    `
  );

  res.render("audios", { audios: data });
});

app.listen(PORT, console.log(`http://${host}:${PORT}`));
