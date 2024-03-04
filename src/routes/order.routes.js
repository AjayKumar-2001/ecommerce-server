const express = require("express")
const router = express.Router();

const orderController = require("../controller/order.controller");
const authenticate = require("../middleware/authenticate");

router.post("/",authenticate, orderController.createOrder);
router.put("/user",authenticate,orderController.orderHistory);
router.put("/:id",authenticate,orderController.findOrderById);

module.exports=router;