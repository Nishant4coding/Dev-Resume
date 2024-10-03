const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchUser= require('../middleware/fetchUser');

// jwt secret token - JSON Web token...
const JWT_SECRET = "ibox_2389jklsjdjf%#@jlk";
//Route 1:  Create a User using: POST "/api/auth/createuser". Doesn't requrie Auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body(
      "password",
      "Password length must be greater than equal to 5"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success= false;
    // Returing error Statement whenever executed...
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    // check weather email exists or not...
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "Email already exist." });
      }
      //creating secure password using bcryptjs
      const salt = await bcrypt.genSalt(10);
      pass = await bcrypt.hash(req.body.password, salt);
      //Creating a new user
      user = await User.create({
        name: req.body.name,
        password: pass,
        email: req.body.email,
      });

      // .then(user=> res.json(user))
      // .catch(err=>console.log(err))
      // res.json({error:'Please enter a unique value for emal'})

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user);
      success= true;
      res.json({ success, authtoken });
    } catch (e) {
      console.error(e.message);
      res.status((500).send("Error occured"));
    }
  }
);

// Route 2 Authenticate a User using: POST "/api/auth/createuser". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password Cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct Credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success= false;
        return res
          .status(400)
          .json({success, error: "Please try to login with correct Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: logged in user using post: POST "/api/auth/getuser". login required

router.post("/getuser", fetchUser, async (req, res) => {

try {
  let userId=req.user.id;
  const user= await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
  });
module.exports = router;
