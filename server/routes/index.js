const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");
const { ensureGuest, ensureAuth } = require("../middleware/auth");

//@desc return segmented chinese text
//@route POST /segment-text
router.post("/segment-text", indexController.segmentText);

//@desc send latest materials and words for the dashboard page
//@route GET /dashboard
router.get("/dashboard", indexController.dashboard);

//@desc [temp] serve index html page
//@route GET /
router.get("/", indexController.getIndex);

module.exports = router;
