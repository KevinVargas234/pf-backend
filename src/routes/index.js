const { Router } = require("express");
// const adminMiddleware = require("./admin");
const categoryMiddleware = require("./category");
// const userMiddleware = require("./user");
const productMiddleware = require ('./product')
const guard=require("../utils/guard")
var cors = require('cors')
const router = Router();
router.use(cors())
router.use("/",guard);
//router.use("/admin", adminMiddleware);
router.use("/category", categoryMiddleware);
//router.use("/user", userMiddleware);
router.use('/product', productMiddleware)


module.exports = router;

// {

//     "id":"1",
//     "name":"llaveros",
//     "description":"un lindo llaveros",
//     "image":"https://www.tiendafacil.com.ar/tienda/uploads/600x600/1642889421_c23ffb94.jpg",
//     "price":"12",
//     "stock":
       //    { stockS:"2",
       //     stockXS:"2", 
       //     "stockM":"2",
       //     "stockL":"2",
       //     "stockXL":"2",}
//     "category":"llaveros",    
//     
//   }