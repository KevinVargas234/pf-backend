const { Router } = require("express");
const { Category } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const categoryFound = await Category.findAll();

    if (name) {
      const categoryName = categoryFound.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      categoryName.length
        ? res.status(200).send(categoryName)
        : res.status(404).json({ message: "Category Name not found" });
    } else return res.status(200).send(categoryFound);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is mandatory." });
    }

    const productCategory = await Category.findAll({
      where: {
        name: name,
      },
    });
    if (productCategory.length > 1) {
      res.status(400).json({ message: "The Category already exist." });
    } else {
      const newCategory = await Category.create({
        name,
      });

      return res.status(201).json({ message: "New Category created." });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
