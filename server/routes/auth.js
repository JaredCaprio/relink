const express = require("express");
const router = express.Router();
const passport = require("passport");
const { ensureAuth } = require("../middleware/auth");
const User = require("../models/User");

// @desc  Auth with Google
// @route GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc  Google auth callback
// @route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(`${process.env.HOST_NAME}/home`);
  }
);

//@desc Logout user
//@route /auth/logout
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      res.json(false);
      return next(err);
    }
  });
  res.json(true);
});

//check if user is logged in
router.get("/check", ensureAuth);

//get current user data
router.get("/api/user", async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json(false);
  }
});

//get all users in db
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

module.exports = router;
