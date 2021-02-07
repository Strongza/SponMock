const express = require("express");
const cors = require("cors");
const mockTest = require("./MockFile/test.json");
const mockTestErr = require("./MockFile/test_err.json");
const insight = require("./MockFile/insight.json");
const insightHeader = require("./MockFile/insightHeader.json");
const refresh = require("./MockFile/refresh.json");

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
    res.json(insight.success);
  } else {
    res.status(404);
    res.json(insight.failed);
  }
});

app.post("/backoffice/user", (req, res) => {
  console.log("=======================>>> ",req.body)
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
    "Bearer strongiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2NvZGUiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiYWNjZXNzX2xldmVsIjoxLCJpYXQiOjE1MTYyMzkwMjJ9.Q6vveOborgZnSKlDxOFE04sBd7jy9dMl4Od-1CUNtCQ"
  ) {
    res.status(200);
    res.json(insight.success);
  } else {
    res.status(401);
    res.json(insight.success);
  }
});

app.post("/backoffice/login/refresh", (req, res) => {
  res.status(200);
  res.json(refresh.success);
});

app.get("/v1/justforyou/insights/header", (req, res) => {
  res.json(insightHeader);
});

app.get("/justforyou/api/test", (req, res) => {
  // console.log(res);
  res.json(mockTest);
});

app.post("/justforyou/api/", (req, res) => {
  res.json(insight);
});
const port = process.env.PORT || 64822;
app.listen(port, () => console.log(`Listening on port${port}...`));
