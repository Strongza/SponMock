const action = require("../Model/model");

function loginMock(flow) {
  switch (flow) {
    case action.SUCCESS:
      return {
        token: "Bearer FirstToken",
        name: "Sponsorlytix",
        user_code: "1",
        access_level: "1",
        status: "A",
      };

    default:
      return {
        error_code: "3",
        message: "User is not found",
      };
  }
}

function loginStaffMock(flow) {
  switch (flow) {
    case action.SUCCESS:
      return {
        token: "Bearer FirstToken",
        name: "Sponsorlytix",
        user_code: "1",
        access_level: "2",
        status: "A",
      };

    default:
      return {
        error_code: "3",
        message: "User is not found",
      };
  }
}

function loginRefresh(flow) {
  switch (flow) {
    case action.SUCCESS:
      return {
        refresh_token: "Bearer 2Token",
      };

    default:
      return {
        error_code: "3",
        message: "User is not found",
      };
  }
}

module.exports = { loginMock, loginRefresh, loginStaffMock };
