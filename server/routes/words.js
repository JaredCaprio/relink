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

//@desc check if word exists
//@route GET /words/check/:word
router.put("/:word", wordsController.checkWord);

//@desc delete existing words
//@route DELETE /words/:id
router.delete("/:id", wordsController.deleteWord);

module.exports = router;
