const express = require("express")
const router = express.Router();

const productController = require("../controller/product.controller");
const authenticate = require("../middleware/authenticate");
const cartItemController = require('../controller/cartItem.controller')

router.post("/",authenticate, productController.createProduct);
router.post("/:id",authenticate, productController.createMultipleProduct);
router.delete("/:id",authenticate,cartItemController.removeCartItem);
router.put("/:id",authenticate, productController.updateProduct);

module.exports=router;