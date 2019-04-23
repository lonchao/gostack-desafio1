const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

function reqValidator(req, res, next) {
  if (req.url != "/" && req.url != "/check") {
    if (req.query.age === undefined || req.query.age === "") {
      res.redirect("/");
    } else {
      return next();
    }
  } else {
    return next();
  }
}
app.use(express.urlencoded({ extended: false }));
app.use(reqValidator);
app.set("view engine", "njk");

app.get("/", (req, res) => {
  return res.render("form");
});
app.post("/check", (req, res) => {
  if (req.body.age > 18) {
    res.redirect(`/major?age=${req.body.age}`);
  } else {
    res.redirect(`/minor?age=${req.body.age}`);
  }
});

app.get("/major", (req, res) => {
  return res.render("info", { tipo: "maior", age: req.query.age });
});
app.get("/minor", (req, res) => {
  return res.render("info", { tipo: "menor", age: req.query.age });
});

app.listen(3000);
