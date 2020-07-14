var express = require("express");
var router = express.Router();
var weather_data = require("../../index");

router.get("/", function (req, res) {
  console.log("Helllo There");
  res.render("home1/first");
});

router.get("/advance", function (req, res) {
  res.render("home1/advance");
});

router.get("/login", function (req, res) {
  console.log("Helllo There");
  res.render("home1/login");
});

router.get("/weather", function (req, res) {
  res.sendStatus(404);
});

module.exports = router;
