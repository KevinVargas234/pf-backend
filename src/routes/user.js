const { Router } = require("express");
const { User } = require("../db");
const { Op } = require("sequelize");
const sendEmail=require("../utils/sendEmail")
const router = Router();

router.get("/name/:name", async (req, res) => {
  let { name } = req.params;
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
    if(req.query.name){
      var user=allUsers.filter(e=>e.name==req.query.name)
      if(user.length){
        res.status(200).json(user[0])
      }else{
        res.status(404).send("no se uncontro al usuario "+req.query.name)
      }

    }else
    return res.json(allUsers); 
  } catch (error) {
    return res.status(404).send(console.log(error));
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, isAdmin } = req.body;
    if (!name || !email) {
      return res.status(400).send("Missing value detected.");
    } else {
      const oldUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (oldUser) {
        return res.status(200).send("User with that email already exists");
      }
      const newUser = await User.create({
        name,
        email,
        isAdmin,
      });
      sendEmail("te pudiste registrar exitosamente en ecomerce",email)
      return res.status(201).send("new User created.");
    }
  } catch (e) {
    return res.status(400).send(console.log(e));
  }
});



module.exports = router;
