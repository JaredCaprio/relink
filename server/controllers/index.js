const User = require("../models/User");
const Materials = require("../models/Materials");

module.exports = {
  getIndex: (req, res) => {
    res.send("Welcome");
  },
  dashboard: async (req, res) => {
    console.log(req.user);
    try {
      const materials = await Materials.find({ user: req.user.id })
        .limit(4)
        .sort({ createdAt: -1 });
      const words = await User.find({ _id: req.user.id }, { wordList: 1 });
      res.json({ materials, words });
    } catch (err) {
      console.error(err);

      res.json({ error: "Server Error" });
    }
  },
};
