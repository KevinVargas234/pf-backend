const { Router } = require("express");
const { Product } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const productFound = await Product.findAll();

    if (name) {
      const productName = productFound.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      productName.length
        ? res.status(200).send(productName)
        : res.status(404).json({ message: "Product Name not found" });
    } else return res.status(200).send(productFound);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, image, price, stock, category } =
      req.body;

    if (
      !name ||
      !description ||
      !image ||
      !price ||
      !stock ||
      !category
    ) {
      return res.status(400).json({ message: "Product value is mandatory." });
    }  
    const newProduct = await Product.create({
      name,
      description,
      image,
      price,
      stock,
      category
    });
    return res.status(201).json({ message: "New Product created.",data:newProduct });
  
  } catch (e) {

    console.log(e);
  }
});
router.post("/rate", async (req, res) => {
  const {id,email,stars}=req.body;
  const productFound = await Product.findAll();
  const productName = productFound.filter((e) =>e.id===id);
  if(productName.length){
    Product.update({
      rate:{...productName.rate,[email]:stars}
    },{
      where: {
        id: id,
      }
  })
    res.status(200).send(productName)
  }else
    res.status(404).json({ message: "Product Name not found" });



})

router.put("/cambiar", async (req, res) =>{
  const {data}  = req.body;

   let dataP= JSON.parse(data)
  const productFound = await Product.findAll();
  
  console.log(dataP[0].name)

  for (let i = 0; i < dataP.length; i++) {
    const productName = productFound.filter((e) =>
        e.name.toLowerCase().includes(dataP[i].name.toLowerCase())
      );
    
      console.log("Producto antes del cambio" ,productName[0])
      const updateProducto ={
        id: productName[0].id ,
        name: productName[0].name,
        category: productName[0].category,
        description: productName[0].description,
        image: productName[0].image,        
        price: productName[0].price,
        stock : { cantidad: String( dataP[0].quantity)} ,
        rate: null,
      }
      console.log("Producto despues del cambio ",updateProducto)

      Product.update(updateProducto ,
       { where: {
          id: updateProducto.id ,
        }}

      )
   
  }
  
 
  res.status(200).send(data)

})

module.exports = router;
