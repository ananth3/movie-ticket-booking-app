const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // if (username.length < 4) {
    //   return res.status(200).json("Username should be atleast 4 characters");
    // }
    // if (password.length < 8) {
    //   return res.status(200).json("Password should be atleast 8 characters");
    // }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.findOne({ email: email });
    if (!user) {
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(200).json({
        status: 200,
        message: "User registered successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "User already exists",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("Invalid Username or Password");
    else {
      req.login(user, (err) => {
        if (err) throw err;
        // res.send("User successfully Logged in");
        res.status(200).json({
          status: 200,
          message: "User Logged in successfully",
        });
      });
    }
  })(req, res, next);
});

router.get("/users", (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/auth-check", (req, res) => {
  try {
    const status = req.isAuthenticated();
    res.send(status);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/logout", (req, res) => {
  try {
    req.logout();
    res.status(200).json({
      status: 200,
      message: "User Logged out successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
