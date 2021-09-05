const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.get("/id:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userId = await User.findOne({ id: id });

    if (userId === null) {
      res.json(`El usuario no existe ${id}`);
    } else {
      res.json(userId);
    }
  } catch (error) {
    res.status(400).json("Error: ", error);
  }
});

router.get("/page:page", async (req, res) => {
  try {
    const page = req.params.page,
      sizePage = 75;

    const user = await User.find()
      .sort({ id: 1 })
      .skip((page - 1) * sizePage)
      .limit(sizePage);

    const u = user;
    if (user.length === 0) {
      res.json("No existen más datos");
    } else {
      res.json(u);
    }
  } catch (error) {
    res.status(400).json("Error:", error);
  }
});

router.get("/page", async (req, res) => {
  try {
    const countUser = await User.find();
    const pageQuantity = Math.ceil(countUser.length / 75);
    res.json(pageQuantity);
  } catch (error) {
    res.status(400).json("Error:", error);
  }
});



router.post("/", async (req, res) => {
  let body = req.body;

  try {
    const id = parseInt(body.id.trim());

    if (!isNaN(id)) {
      const newUser = new User({
        id: parseInt(body.id.trim()),
        first_name: body.first_name,
        last_name: body.last_name,
        donations: body.donations,
        total: body.total,
        image: body.image,
        description: body.description,
      });

     const resul = await newUser.save(function (err) {
        if (err) {
          res.status(400).json("El usuario ya existe");
        } else {
          res.json("Se creo un nuevo Donante");
        }
      });
    } else {
      res.json("Los id deben ser numeros");
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const updateUser = await User.findByIdAndUpdate(id, {
    $set: {
      first_name: body.first_name,
      last_name: body.last_name,
      donations: body.donations,
      total: body.total,
      image: body.image,
      description: body.description,
    }
    }, {new: true});

    if(updateUser === null){
        res.json(`El usuario no existe`);

    }else{
        res.json(`Se actualizo el usuario`);
    }
  
});


router.delete("/id:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const deleteUser = await User.deleteOne({ id: id });

    if (deleteUser === null || deleteUser.deletedCount === 0) {
      res.json(`El usuario no existe: ${id}`);
    } else {
      res.json(`Se elimino correctamente el usuario: ${id} `);
    }
  } catch (error) {
    res.status(400).json("Error: ", error);
  }
});

module.exports = router;
