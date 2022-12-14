const { Router } = require("express");
// const adminMiddleware = require("./admin");
 const userMiddleware = require("./user");
const productMiddleware = require ('./product')
const mercadoPagoMiddleware = require ('./MercadoPago')

const guard=require("../utils/guard")
var cors = require('cors')
const router = Router();
router.use(cors())
router.use("/",guard);
router.use("/mc", mercadoPagoMiddleware);
//router.use("/admin", adminMiddleware);
router.use("/mc", mercadoPagoMiddleware);
router.use("/user", userMiddleware);
router.use('/product', productMiddleware)



module.exports = router;

