const { Router } = require("express");
const { Category, Product } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.query;
    const productFound = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

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
    const { id, name, description, image, price, stock, size, category } =
      req.body;

    if (
      !id ||
      !name ||
      !description ||
      !image ||
      !price ||
      !stock ||
      !size ||
      !category
    ) {
      return res.status(400).json({ message: "Product value is mandatory." });
    }
    const productFound = await Product.findAll();
    const productCategory = await Category.findAll({
      where: {
        name: category,
      },
    });
    if (name===100) {
      const productId = productFound.find((e) => e.id === id);
      if (productId.length>0)
        res.status(400).json({ message: "Product Id already exist." });
    } else {
      const newProduct = await Product.create({
        name,
        description,
        image,
        price,
        stock,
        size,
      });
      await newProduct.addCategory(productCategory);
      return res.status(201).json({ message: "New Product created." });
    }
  } catch (e) {
    // console.log(newPokemon)
    console.log(e);
  }
});

module.exports = router;
