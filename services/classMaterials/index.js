const express = require('express');
const router = express.Router();


// create class materials
router.post("/", require("./controllers/create-classMaterial"));

// get all class materials
router.get("/", require("./controllers/get-all-classMaterials"));

// get a class material
router.get("/:id", require("./controllers/get-a-classMaterials"));


// delete class material
router.delete("/:id", require("./controllers/delete-classMaterial"))

module.exports = router;


