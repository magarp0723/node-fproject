require("dotenv").config();
var express = require("express");
var path = require("path");
var request = require("request");
var app = express();
var mysqlConnection = require("./params/connection");

const jwt = require("jsonwebtoken");

app.use(express.json());

app.use("/", express.static("assets"));
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

app.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password1;
  console.log(username);
  console.log(password);
  if (username && password) {
    mysqlConnection.query(
      "SELECT * FROM loginsys WHERE username = ? AND password =?",
      [username, password],
      function (error, results, fields) {
        if (results.length > 0) {
          console.log("abcd");
          res.redirect("/user");
        } else {
          console.log("xyz");
          res.redirect("/login");
        }
      }
    );
  } else {
    console.log("1234");
    res.redirect("/login");
  }
});

app.post("/advance", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  console.log(password);
  mysqlConnection.query(
    "INSERT INTO loginsys (username,password) VALUES ('" +
      username +
      "','" +
      password +
      "');",
    function (err, fields) {
      if (!err) {
        console.log("added successfully");
        res.redirect("/");
      } else {
        console.log(err);
        res.redirect("/advance");
      }
    }
  );
});

app.get("/user", verifywebtoken, function (req, res) {
  mysqlConnection.query("SELECT * FROM loginsys;", (err, data) => {
    if (!err) {
      //res.render('home1/display');
      // res.send('hello world');
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write("hello world how are u");
    }
  });
});

function webtoken(username, password) {
  const user = { name: username, pass: password };
  const accesstoken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  var opp = { accessToken: accesstoken };
  //console.log(opp);
  return opp;
}

function verifywebtoken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  console.log("popopopo");
  console.log(token);
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

app.listen(3000, console.log("listening to port 3000"));
