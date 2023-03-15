const Materials = require("../models/Materials");

module.exports = {
  getMaterials: async (req, res) => {
    const materials = await Materials.where("user").equals(req.user._id);
    res.json(materials);
  },
  /*  getMaterial: async(req,res) =>{
    const material = await Materials.where('_id').equals(req.body._id)
  } */
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
      res.send(false);
    }
  },
};
