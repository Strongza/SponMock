const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const mockTest = require("./MockFile/test.json");
const mockTestErr = require("./MockFile/test_err.json");

const sponsorMock = require("./MockFile/Sponsor.json");
const brandMock = require("./MockFile/Brand.json");
const clientMock = require("./MockFile/Client.json");
const countriesMock = require("./MockFile/Countries.json");
const sportsMock = require("./MockFile/Sports.json");

const action = require("./Model/model");
const Login = require("./Mock/Login");
const User = require("./Mock/User");
const Client = require("./Mock/Client");
const VideoGame = require("./Mock/videoGame");
const flowAction = require("./Model/apiFlow");

let flow = {
  isStaff: true,
  login: flowAction.SUCCESS,
  getRefreshToken: flowAction.SUCCESS,
  getUser: flowAction.SUCCESS,
  getCustomers: flowAction.SUCCESS,
  postAddGame: flowAction.FAILED,
  getSponsor: flowAction.SUCCESS,
  getSponsorShipAssets: flowAction.SUCCESS,
  postBrandSearch: flowAction.SUCCESS,
  getCustomersHome: flowAction.SUCCESS,
  getCounties: flowAction.SUCCESS,
  getSports: flowAction.SUCCESS,
  postCustomer: flowAction.SUCCESS,
};

const app = express();

app.use(cors());

app.use(express.json());

app.use(function (req, res, next) {
  console.log("method: " + req.method);
  console.log("url: " + req.url);
  console.log("header:" + JSON.stringify(req.headers, null, 2));
  console.log("body: " + JSON.stringify(req.body, null, 2));
  next();
});

app.post("/backoffice/login", (req, res) => {
  switch (flow.login) {
    case flowAction.SUCCESS:
      if (flow.isStaff) {
        res.status(200);
        res.json(Login.loginStaffMock(action.SUCCESS));
      } else {
        res.status(200);
        res.json(Login.loginMock(action.SUCCESS));
      }
      break;
    default:
      res.status(404);
      res.json(Login.loginMock(action.FAILED));
      break;
  }
});

app.post("/backoffice/login/refresh", (req, res) => {
  switch (flow.getRefreshToken) {
    case flowAction.SUCCESS:
      res.status(200);
      res.json(Login.loginRefresh(action.SUCCESS));
      break;
    default:
      res.status(401);
      break;
  }
});

app.get("/backoffice/customers", (req, res) => {
  switch (flow.getCustomers) {
    case flowAction.SUCCESS:
      res.status(200);
      res.json(clientMock.Get_Client_List_success);
      break;
    case flowAction.EXPIRED:
      if (
        req.headers.authorization ==
        Login.loginRefresh(action.SUCCESS).refresh_token
      ) {
        res.status(200);
        res.json(Client.getClient(action.SUCCESS));
      } else {
        res.status(401);
        res.json();
      }
    default:
      res.status(404);
      res.json(Client.getClient(action.FAILED));
      break;
  }
});

app.post("/backoffice/customers/", upload.any(), (req, res) => {
  switch (flow.postCustomer) {
    case flowAction.SUCCESS:
      console.log("===================");
      console.log(
        "company :" + JSON.stringify(JSON.parse(req.body.company), null, 2)
      );
      console.log(
        "user :" + JSON.stringify(JSON.parse(req.body.user), null, 2)
      );
      console.log(req.files);
      res.status(200);
      res.json(clientMock.Post_New_Customer_Success);
      break;

    default:
      break;
  }
});

app.get("/backoffice/customers/:id/home/", (req, res) => {
  switch (flow.getCustomersHome) {
    case flowAction.SUCCESS:
      res.status(200);
      res.json(clientMock.Get_Customer_Home_success);
      break;

    default:
      break;
  }
});

app.get("/backoffice/users", (req, res) => {
  switch (flow.getUser) {
    case flowAction.SUCCESS:
      res.status(200);
      res.json(User.getUser(action.SUCCESS));
      break;
    case flowAction.EXPIRED:
      if (
        req.headers.authorization ==
        Login.loginRefresh(action.SUCCESS).refresh_token
      ) {
        res.status(200);
        res.json(User.getUser(action.SUCCESS));
      } else {
        res.status(401);
        res.json();
      }
      break;
    default:
      res.status(401);
      res.json();
      break;
  }
});

app.post("/backoffice/user", (req, res) => {
  if (req.body.username === "boonpat.papob@gmail.com") {
    res.status(200);
    res.json(insight.success);
  } else {
    res.status(404);
    res.json(insight.failed);
  }
});

app.post("/backoffice/video_game", (req, res) => {
  switch (flow.postAddGame) {
    case flowAction.SUCCESS:
      res.status(200);
      res.json();
      break;
    default:
      res.status(400);
      res.json(VideoGame.postAddGame(action.FAILED));
      break;
  }
});

app.get("/backoffice/customers/55655959595/sponsorships/", (req, res) => {
  switch (flow.getSponsor) {
    case flowAction.SUCCESS:
      console.log(sponsorMock.Get_success);
      res.status(200);
      res.json(sponsorMock.Get_success);
      break;
    default:
      break;
  }
});

app.get("/backoffice/sponsorships/assets/", (req, res) => {
  switch (flow.getSponsorShipAssets) {
    case flowAction.SUCCESS:
      res.status(200);
      res.json(sponsorMock.Get_Assets_Success);
      break;
    default:
      break;
  }
});

app.get("/backoffice/countries/", (req, res) => {
  switch (flow.getCounties) {
    case flowAction.SUCCESS:
      res.status(200);
      res.json(countriesMock.Get_Countries_success);
      break;
    default:
      break;
  }
});
app.get("/backoffice/sports/", (req, res) => {
  switch (flow.getSports) {
    case flowAction.SUCCESS:
      res.status(200);
      res.json(sportsMock.Get_Sports_success);
      break;
    default:
      break;
  }
});

app.post("/backoffice/brands/search/", (req, res) => {
  switch (flow.postBrandSearch) {
    case flowAction.SUCCESS:
      let data =
        req.body.brand_name !== ""
          ? brandMock.Brand_Search_Success.filter((el) => {
              return el.name
                .toLocaleLowerCase()
                .includes(req.body.brand_name.toLocaleLowerCase());
            })
          : undefined;

      res.status(200);
      res.json(data);
      break;
    default:
      break;
  }
});

const port = process.env.PORT || 64822;
app.listen(port, () => console.log(`Listening on port${port}...`));
