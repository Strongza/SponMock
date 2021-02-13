const action = require("../Model/model");

function getClient(flow) {
  switch (flow) {
    case action.SUCCESS:
      return [
        {
          client_name: "Mc Donalds",
          territory: "Canada's Yukon Territory",
          country: "Canada",
          sport: "Football",
          payment_plan: 1,
          amount: 10000,
          account_manager: "Ronald Mc Donald",
          customer_code: "CUS001",
        },
        {
          client_name: "Mc Donalds2",
          territory: "Canada's Yukon Territoryaaa",
          country: "Canada",
          sport: "Football",
          payment_plan: 2,
          amount: 100000,
          account_manager: "Ronald Mc Donaldsss",
          customer_code: "CUS001aa",
        },
      ];

    default:
      return {
        error_code: "3",
        message: "User is not found",
      };
  }
}

module.exports = { getClient };
