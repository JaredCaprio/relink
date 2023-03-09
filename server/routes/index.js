const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");
const { ensureGuest, ensureAuth } = require("../middleware/auth");

//@desc return segmented chinese text
//@route GET /segment-text
router.post("/segment-text", indexController.segmentText);

//@desc [temp] serve index html page to submit text to be segmented
//@route GET /
router.get("/", ensureGuest, indexController.getIndex);

router.get("/success", ensureAuth, indexController.getSuccess);
router.get("/verified", ensureAuth, indexController.getVerified);

module.exports = router;
