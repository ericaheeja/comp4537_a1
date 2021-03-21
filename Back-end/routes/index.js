let express = require("express");
let router = express.Router();

let mysql = require("mysql");
let db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0505",
  database: "assignment1",
});

router.get("/", function (req, res) {
  res.render("index", { title: "Assignment1" });
});

router.get("/admin", function (req, res) {
  db.query("SELECT * FROM quote", function (err, rs) {
    res.render("admin", { quote: rs });
  });
});

router.get("/form", function (req, res) {
  res.render("form", { quote: {} });
});

router.post("/form", function (req, res) {
  db.query("INSERT INTO quote SET ?", req.body, function (err, rs) {
    res.redirect("/admin");
  });
});

router.get("/edit", function (req, res) {
  db.query("SELECT * FROM quote WHERE ID = ?", req.query.ID, function (err, rs) {
    res.render("form", { quote: rs[0] });
  });
});

router.post("/edit", function (req, res) {
  var param = [req.body, req.query.ID];
  db.query("UPDATE quote SET ? WHERE ID = ?", param, function (err, rs) {
    res.redirect("/admin");
  });
});

router.get("/delete", function (req, res) {
  db.query("DELETE FROM quote WHERE ID = ?", req.query.ID, function (err, rs) {
    res.redirect("/admin");
  });
});

router.get("/reader", function (req, res) {
  db.query("SELECT * FROM quote", function (err, rs) {
    res.render("reader", { quote: rs });
  });
});

module.exports = router;
