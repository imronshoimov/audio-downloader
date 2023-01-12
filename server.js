const express = require("express");
const app = express();
const ejs = require("ejs");
const download = require("download");
const path = require("path");
const fs = require("fs");
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
    res.redirect("https://blue-itchy-sturgeon.cyclic.app/audios");
  }
});

app.get("/audios", async (req, res) => {
  const data = await fetchAll(
    `
      select * from audios order by id desc
    `
  );

  if (data.length == 0) {
    fs.readdir(path.join(__dirname, "public", "audios"), (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(__dirname, "public", "audios", file), (err) => {
          if (err) throw err;
        });
      }
    });
  }

  res.render("audios", { audios: data });
});

app.listen(PORT, console.log(`http://${host}:${PORT}`));
