const Materials = require("../models/Materials");

module.exports = {
  getMaterials: async (req, res) => {
    try {
      const materials = await Materials.where("user").equals(req.user._id);
      res.json(materials);
    } catch (error) {
      console.error(error);
      res.json(false);
    }
  },
  getMaterial: async (req, res) => {
    try {
      const material = await Materials.findById(req.params.id).populate("user");

      if (req.user.googleId === material.user.googleId) {
        res.json(material);
      }
    } catch (error) {
      console.error(error);
    }
  },
  addMaterial: async (req, res) => {
    console.log(req.body);

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
      }
    } catch (error) {
      console.error(err);
      ``;
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
        { new: true, runValidators: true }
      );
      res.json(true);
    } catch (error) {
      console.error(error);
    }
  },
};
