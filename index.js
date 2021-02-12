const express = require("express");
const cors = require("cors");
const mockTest = require("./MockFile/test.json");
const mockTestErr = require("./MockFile/test_err.json");

// const insight = require("./MockFile/insight.json");
// const insightHeader = require("./MockFile/insightHeader.json");
// const refresh = require("./MockFile/refresh.json");

const action = require("./Model/model");
const Login = require("./Mock/login");
const User = require("./Mock/user");

const app = express();

app.use(cors());

app.use(express.json());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use(function(req, res, next) {
//   req.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

let enable = {
  login: 2,
};

app.use(function (req, res, next) {
  console.log("method: " + req.method);
  console.log("url: " + req.url);
  console.log("header:" + JSON.stringify(req.headers, null, 2));
  console.log("body: " + JSON.stringify(req.body, null, 2));
  next();
});
app.post("/backoffice/auth/login", (req, res) => {
  if (req.body.username === "boonpat.papob@gmail.com") {
    res.status(200);
    res.json(Login.loginMock(action.SUCCESS));
  } else {
    res.status(404);
    res.json(Login.loginMock(action.FAILED));
  }
});

app.post("/backoffice/login/refresh", (req, res) => {
  res.status(200);
  res.json(Login.loginRefresh(action.SUCCESS));
});

app.post("/backoffice/user", (req, res) => {
  console.log("=======================>>> ", req.body);
  if (req.body.username === "boonpat.papob@gmail.com") {
    res.status(200);
    res.json(insight.success);
  } else {
    res.status(404);
    res.json(insight.failed);
  }
});

app.get("/backoffice/users", (req, res) => {
  if (
    req.headers.authorization ==
    Login.loginRefresh(action.SUCCESS).refresh_token
  ) {
    res.status(200);
    res.json(User.getUser(action.SUCCESS));
    // res.status(400);
    // res.json(User.getUser(action.FAILED));
  } else {
    res.status(401);
    res.json();
  }
});

const port = process.env.PORT || 64822;
app.listen(port, () => console.log(`Listening on port${port}...`));
