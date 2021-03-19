const action = require("../Model/model");

function postAddGame(flow) {
  switch (flow) {
    case action.SUCCESS:
      return;

    default:
      return {
        error_code: 2,
        message: "Field password is missing",
      };
  }
}

module.exports = { postAddGame };
