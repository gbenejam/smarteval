const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

//Create user
router.post("/api/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    console.log(e)
    res.status(400).send(e);
  }
});

//Login
router.post("/api/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Logout
router.post("/api/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

//Get users
router.get("/api/users", auth, async (req, res) => {
  try {
    const users = await User.find({isAdmin: "false"});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/api/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const user = await User.findById(req.params.id);

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Get a specific user
router.get("/api/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send(user);
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Remove user
router.delete('/api/users/:id', auth, async (req,res) => {
  try {
      const user = req.user
      const userQuery = await User.findByIdAndDelete(req.params.id).then(async () => {
          const users = await User.find({})
          res.send(users)
      }).catch((e) => console.log(e))
  } catch(e) {
      res.status(500).send(e)
  }
})

module.exports = router;
