const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// create all classes
router.post("/",verifyToken, require("./controllers/create-classes"));

// get all classes
router.get("/", verifyToken, require("./controllers/get-classes"));

// get all classes
router.get("/:id",verifyToken, require("./controllers/get-a-classes"));

module.exports = router;