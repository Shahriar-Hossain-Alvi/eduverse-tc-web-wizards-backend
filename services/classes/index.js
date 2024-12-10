const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// create all classes
router.post("/",verifyToken, require("./views/create-classes"));

// get all classes
router.get("/", verifyToken, require("./views/get-classes"));

// get all classes
router.get("/:id",verifyToken, require("./views/get-a-classes"));

module.exports = router;