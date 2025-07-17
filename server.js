require("dotenv").config();
const express = require("express");
const basicAuth = require("express-basic-auth");
const cron = require("node-cron");
const { fetchAndSaveOrders } = require("./src/services/orderService");

const app = express();
app.use(express.json());

const { BASIC_AUTH_USER, BASIC_AUTH_PASSWORD } = process.env;

app.use(
  basicAuth({
    users: { [BASIC_AUTH_USER]: BASIC_AUTH_PASSWORD },
    challenge: true,
  })
);

const orderRouter = require("./src/routes/order");

app.use("/order", orderRouter);

cron.schedule("0 2 * * *", async () => {
  console.log(
    `[${new Date().toISOString()}] Running scheduled orders fetch...`
  );
  await fetchAndSaveOrders();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running at port ${PORT}`);
  await fetchAndSaveOrders();
});
