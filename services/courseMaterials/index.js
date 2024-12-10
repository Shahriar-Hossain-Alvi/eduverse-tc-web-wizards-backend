const express = require("express");
const router = express.Router();

// crate new course material
router.post("/", require("./view/create-courseMaterial"));


// get all course material
router.get("/", require("./view/get-courseMaterial"));


// get single course material
router.get("/:id", require("./view/get-a-courseMaterial"));


// delete a course material
router.delete("/:id", require("./view/delete-courseMaterial.js"))


// update a course material
router.patch("/:id", require("./view/update-courseMaterial.js"))





module.exports = router;