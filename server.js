const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const addText = require('./routes/text')
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.render("index", {
    path: "/",
  });
});

// app.use((req, res, next) => {
//   res.status(404).render("404", { PageTitle: "Question NOt Found!" });
// });

app.post("/", addText);

app.listen(8000);
