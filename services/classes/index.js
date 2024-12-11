const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// create all classes
router.post("/",verifyToken, require("./view/create-classes"));

// get all classes
router.get("/", verifyToken, require("./view/get-classes"));

// get all classes
router.get("/:id",verifyToken, require("./view/get-a-classes"));

module.exports = router;