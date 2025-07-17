const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAll);
router.get("/:id", orderController.get);

module.exports = router;
