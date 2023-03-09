const express = require("express");
const router = express.Router();
const materialsController = require("../controllers/materials");

//@desc show most recent materials
//@route GET /materials/
router.get("/", materialsController.getMaterials);

//@desc add new material to DB
//@route POST /materials/add
router.post("/add", materialsController.addMaterial);

//@desc update existing materials
//@route PUT /materials/update/:id
router.put("/:id", materialsController.updateMaterial);

//@desc delete existing materials
//@route DELETE /materials/:id
router.delete("/:id", materialsController.deleteMaterial);
