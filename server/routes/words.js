const express = require("express");
const router = express.Router();
const wordsController = require("../controllers/words");

//@desc show most recent words
//@route GET /words/
router.get("/", wordsController.getWords);

//@desc add new words to DB
//@route POST /words/add
router.post("/add", wordsController.addword);

//@desc Return definition of word
//@route POST /words/define/:word
router.get("/define/:word", wordsController.defineWord);

//@desc update existing words
//@route PUT /words/update/:id
/* router.put("/:id", wordsController.updateword); */

//@desc delete existing words
//@route DELETE /words/:id
router.delete("/:id", wordsController.deleteWord);

module.exports = router;
