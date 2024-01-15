const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleWare/fetchUser");

const JWT_SECRET = "kjsd@HJM123";
//ROUTE: create a User using: POST: "/api/auth/createUser". no login required
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast five character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are an errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check whether the user with same mail already existed or not.
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "email or password are incorrect" });
      }
      const salt = await bcrypt.genSalt(10);
      securePass = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // res.json(user);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error occured");
    }
  }
);
//ROUTE: Authenticate a user using: POST "/api/auth/login".
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    // if there are an errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "email or password are incorrect" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "email or password are incorrect" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error occured");
    }
  }
);

// ROUTE: get details of loggedin user using: POST "api/auth/getUser"
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
