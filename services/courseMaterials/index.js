const express = require("express");
const router = express.Router();

// Get all users
router.post("/", require("./view/create-courseMaterial"));



module.exports = router;