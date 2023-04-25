const User = require("../models/User");
const cedict = require("coupling-dict-chinese");

module.exports = {
  //Returns all words from logged in user sorted by date, most recent first.
  getWords: async (req, res) => {
    try {
      const usersWordList = await User.find({ _id: req.user.id });
      res.json(usersWordList[0].wordList);
    } catch (err) {
      console.error(err);
    }
  },
  defineWord: (req, res) => {
    try {
      if (/[\u4e00-\u9fa5]/g.test(req.params.word)) {
        cedict.searchByChinese(req.params.word, (words) => {
          res.json(words);
        });
      } else {
        cedict.searchByPinyin(req.params.word, (words) => {
          res.json(words);
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
  addword: async (req, res) => {
    const userId = req.user.id;
    try {
      //Check if word already added to wordlist
      const isWordAdded = await User.exists({
        "wordList.chineseCharacters": req.body.chineseCharacters,
      });
      if (isWordAdded === null) {
        const user = await User.findOneAndUpdate(
          userId,
          {
            $push: { wordList: req.body, $sort: { createdAt: -1 } },
          },
          { new: true }
        );
        res.json(true);
      } else {
        res.json(false);
      }
    } catch (err) {
      console.error(err);
    }
  },
  deleteWord: async (req, res) => {
    const userId = req.user.id;

    console.log(req.params, "worked");
    try {
      const isWordAdded = await User.exists({
        "wordList._id": req.params.id,
      });
      if (isWordAdded !== null) {
        const user = await User.updateOne(
          { _id: userId },
          { $pull: { wordList: { _id: req.params.id } } }
        );
        const updatedUser = await User.find({ _id: userId });
        res.json({ wordList: updatedUser[0].wordList, deleted: true });
      }
    } catch (err) {
      console.error(err);
    }
  },
  checkWord: async (req, res) => {
    const isWordAdded = await User.exists({
      "wordList._id": req.params.word,
    });

    res.json(isWordAdded);
  },
};
