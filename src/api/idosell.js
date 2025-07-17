const axios = require("axios");
const { formatOrder } = require("../utlis/formatOrder");

const { IDOSELL_API_KEY, IDOSELL_API_URL } = process.env;

const DEFAULT_SORT = {
  elementName: "order_date",
  sortDirection: "DESC",
};
const LIMIT = 100;

async function getAllOrders() {
  let allOrders = [];
  let currentPage = 0;
  let totalPages = 1;

  while (currentPage < totalPages) {
    const { orders, resultsNumberPage } = await getOrdersPage(currentPage);
    allOrders = allOrders.concat(orders);
    totalPages = resultsNumberPage;
    currentPage++;
  }

  return allOrders;
}

async function getOrdersPage(page = 0, sortOptions = DEFAULT_SORT) {
  const options = {
    method: "POST",
    url: `${IDOSELL_API_URL}/orders/orders/search`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": IDOSELL_API_KEY,
    },
    data: {
      params: {
        ordersBy: [sortOptions],
        resultsPage: page,
        resultsLimit: LIMIT,
      },
    },
  };

  try {
    const response = await axios.request(options);
    const results = response.data.Results || [];
    const resultsNumberPage = response.data.resultsNumberPage || 0;

    return {
      orders: results.map(formatOrder),
      resultsNumberPage,
    };
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    return { orders: [], resultsNumberPage: 0 };
  }
}

module.exports = { getAllOrders };
