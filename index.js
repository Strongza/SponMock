const express = require("express");
const cors = require("cors");
const mockTest = require("./MockFile/test.json");
const mockTestErr = require("./MockFile/test_err.json");
const insight = require("./MockFile/insight.json");
const insightHeader = require("./MockFile/insightHeader.json");

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
  console.log("body: " + JSON.stringify(req.body, null, 2));
  next();
});
app.post("/auth/login", (req, res) => {
  if (req.body.username === "boonpat.papob@gmail.com") {
    res.status(200);
    res.json(insight.success);
  } else {
    res.status(404);
    res.json(insight.failed);
  }
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
