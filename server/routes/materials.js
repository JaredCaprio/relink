const express = require("express");
const router = express.Router();
const materialsController = require("../controllers/materials");

//@desc show most recent materials
//@route GET /materials/
router.get("/", materialsController.getMaterials);

//@desc show single material from id
//@route GET /materials/:id
router.get("/:id", materialsController.getMaterial);

//@desc add new material to DB
//@route POST /materials/add
router.post("/add", materialsController.addMaterial);

//@desc update existing materials
//@route PUT /materials/edit/:id
router.put("/edit/:id", materialsController.updateMaterial);

//@desc delete existing materials
//@route DELETE /materials/:id
router.delete("/:id", materialsController.deleteMaterial);

module.exports = router;
