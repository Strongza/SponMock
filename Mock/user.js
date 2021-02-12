const action = require("../Model/model");

function getUser(flow) {
  switch (flow) {
    case action.SUCCESS:
      return [
        {
          user_code: "1",
          username: "abc1",
          name: "abc",
          email: "abc@gmail.com",
          access_level: "1",
          customer_Count: "10",
        },
        {
          user_code: "1",
          username: "def1",
          name: "def",
          email: "def@gmail.com",
          access_level: "2",
          customer_Count: "100",
        },
      ];

    default:
      return {
        error_code: "3",
        message: "User is not found",
      };
  }
}

module.exports = { getUser };
