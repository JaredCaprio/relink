const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");

//@desc sends flash messages from the session
//@route GET /api/messages
router.get("/messages", apiController.getMessages);

module.exports = router;
