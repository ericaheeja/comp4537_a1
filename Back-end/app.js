let express = require("express");
let path = require("path");

let http = require("http");

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");

let app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;
let server = http.createServer(app);
server.listen(port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
