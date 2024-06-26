const Materials = require("../models/Materials");
const User = require("../models/User");

module.exports = {
  getMaterials: async (req, res) => {
    const limit = req.query.limit || null;
    try {
        const materials = await Materials.where("user")
          .limit(limit)
          .equals(req.user._id)
          .sort({ createdAt: -1 });
        res.json(materials);
      } catch (error) {
        console.error(error);
        res.json(false);
      }    
  },
  getMaterial: async (req, res) => {
    try {
      const material = await Materials.findById(req.params.id).populate("user");
      const materialSplitArray = material.body
        .trim()
        .replace(/[\r\n]/g, "")
        .replace(/([0-9])([\u4e00-\u9fa5])/g, "$1 $2 ")
        .split(" ");

      const foundWords = await User.aggregate([
        {
          $match: {
            _id: req.user._id,
            "wordList.chineseCharacters": { $in: materialSplitArray },
          },
        },
        {
          $project: {
            _id: 0,
            wordList: {
              $filter: {
                input: "$wordList",
                as: "word",
                cond: { $in: ["$$word.chineseCharacters", materialSplitArray] },
              },
            },
          },
        },
      ]);

      if (foundWords.length < 1) {
        const bodyArray = materialSplitArray.map((char) => {
          return { word: char, known: false };
        });
        material.body = bodyArray;
        res.json(material);
        return;
      } else {
        const knownWords = foundWords[0].wordList.map((word) => {
          return word.chineseCharacters;
        });

        material.body = materialSplitArray.map((char) => {
          if (/[\u4E00-\u9FFF\s]+/g.test(char) && !knownWords.includes(char)) {
            return { word: char, known: false };
          } else {
            return { word: char, known: true };
          }
        });

        //Check if logged in user is the creator of material
      }

      if (req.user.googleId === material.user.googleId) {
        res.json(material);
      }
    } catch (error) {
      res.status(403).json(false);
      console.error(error);
    }
  },
  addMaterial: async (req, res) => {
    try {
      const findMaterial = await Materials.exists({
        title: req.body.title,
        body: req.body.body,
        type: req.body.type,
        user: req.user.id,
      });
      if (!findMaterial) {
        await Materials.create({
          title: req.body.title,
          body: req.body.body,
          type: req.body.type,
          user: req.user._id,
        });
        res.send(true);
      } else {
        res.send(false);
      }
    } catch (error) {
      console.error(error);
      res.send(false);
    }
  },
  updateMaterial: async (req, res) => {
    try {
      const updatedMaterial = req.body;
      let material = await Materials.findById(req.params.id);
      material = await Materials.findByIdAndUpdate(
        req.params.id,
        updatedMaterial,
        { new: true, runValidators: true },
      );
      res.json(true);
    } catch (error) {
      res.json(false);
      console.error(error);
    }
  },
  deleteMaterial: async (req, res) => {
    try {
      let material = await Materials.deleteOne({ _id: req.params.id });

      res.json(true);
    } catch (error) {
      console.error(err);
      res.json(err.message);
    }
  },
};
