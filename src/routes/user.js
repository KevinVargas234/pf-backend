const { Router } = require("express");
const { User } = require("../db");
const { Op } = require("sequelize");

const router = Router();

router.get("/name/:name", async (req, res) => {
  let { name } = req.params;
  let arr = fullName.split(" ");
  arr = arr.map((e) => {
    let word = e.split("");
    word[0] = word[0].toUpperCase();
    word = word.join("");
    return word;
  });
  arr = arr.join(" ");
  try {
    const findUser = await User.findAll({
      where: {
        name: { [Op.like]: `%${arr}%` },
      },
    });
    if (findUser.length === 0) {
      res.status(400).send("Name not found");
    } else {
      res.status(200).json(findUser);
    }
  } catch (error) {
    res.status(400).send(console.log(error));
  }
});

router.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = await User.findOne({
      where: {
        id: id,
      },
    });
    if (findUser.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(200).json(findUser);
    }
  } catch (error) {
    res.status(400).send(console.log(error));
  }
});

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    return res.json(allUsers);
  } catch (error) {
    return res.status(404).send(console.log(error));
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("Missing value detected.");
    } else {
      const oldUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (oldUser) {
        return res.status(400).send("User with that email already exists");
      }
      const newUser = await User.create({
        name,
        email,
        password,
        isAdmin,
      });
      return res.status(201).send("new User created.");
    }
  } catch (e) {
    return res.status(400).send(console.log(e));
  }
});

router.put("/email/:email", async (req, res) => {
  const paramEmail = req.params.email;
  const { name, email, password } = req.body;
  try {
    if (paramEmail) {
      const user = await User.findOne({
        where: {
          email: paramEmail,
        },
      });
      if (user) {
        const updatedUser = {
          name,
          email,
          password,
        };
        user.update(updatedUser);
        return res.status(200).send("User updated succcessfully");
      } else {
        return res
          .status(404)
          .send("An user with that email could not be found");
      }
    } else {
      return res.status(404).send("Missing value detected");
    }
  } catch (error) {
    return res.status(400).send(console.log(error));
  }
});

router.delete("/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { restoreuser } = req.query;
    if (!email) return res.status(400).send("Missing value detected.");
    if (restoreuser) {
      await User.restore({
        where: {
          email: email,
        },
      });
      return res.status(200).json({ message: "User restored." });
    } else {
      let user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (user) {
        User.destroy({
          where: {
            email: email,
          },
        });
        return res.status(200).send("User deleted.");
      } else res.status(404).send("User with that email could not be found.");
    }
  } catch (e) {
    res.status(400).send(console.log(e));
  }
});

module.exports = router;
