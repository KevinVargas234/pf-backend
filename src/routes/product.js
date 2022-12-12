const { Router } = require("express");
const { Product } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.query;
    const productFound = await Product.findAll();

    if (id) {
      const productId = productFound.filter((e) => e.id == id);
      productId.length
        ? res.status(200).json(productId)
        : res.status(404).json({ message: "Product ID not found." });
    } else if (name) {
      const productName = productFound.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      productName.length
        ? res.status(200).send(productName)
        : res.status(404).json({ message: "Product Name not found" });
    } else return res.status(200).send(productFound);
  } catch (e) {
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
    const newProduct = await Product.findOrCreate({
      name,
      description,
      image,
      price,
      stock,
      category
    });
    return res.status(201).json({ message: "New Product created.",data:newProduct });
  
  } catch (e) {
    // console.log(newPokemon)
    console.log(e);
  }
});

module.exports = router;
