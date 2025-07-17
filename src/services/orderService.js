const fs = require("fs").promises;
const path = require("path");
const { getAllOrders } = require("../api/idosell");

const ORDERS_FILE_PATH = path.join(__dirname, "../../orders.json");

async function fetchAndSaveOrders() {
  try {
    console.log("Starting orders fetch...");
    const orders = await getAllOrders();
    const ordersJSON = JSON.stringify(orders, null, 2);

    await fs.writeFile(ORDERS_FILE_PATH, ordersJSON);
    console.log(`Successfully saved ${orders.length} orders to file`);

    return orders;
  } catch (error) {
    console.error("Failed to fetch and save orders:", error);
    throw error;
  }
}

async function loadOrdersFromFile() {
  try {
    const data = await fs.readFile(ORDERS_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("No orders file found, fetching fresh data...");
      return await fetchAndSaveOrders();
    }
    throw error;
  }
}

async function findById(id) {
  const orders = await loadOrdersFromFile();
  const order = orders.find((order) => order.orderID == id);

  return order;
}

module.exports = { fetchAndSaveOrders, loadOrdersFromFile, findById };
