const User = require("../models/User");
const Materials = require("../models/Materials");

module.exports = {
  getIndex: (req, res) => {
    res.send("Welcome");
  },
  dashboard: async (req, res) => {
    const userId = req.user.id || null;
    try {
      const materials = await Materials.where("user")
        .equals(userId)
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
