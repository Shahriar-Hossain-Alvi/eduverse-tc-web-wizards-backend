const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")

// Apply middleware globally for all remaining routes
router.use(verifyToken)



// create a class
router.post("/", require("./controllers/create-classes"));

// get all classes
router.get("/", require("./controllers/get-classes"));

// get a class
router.get("/:id", require("./controllers/get-a-classes"));


// delete a class
router.delete("/:id", require("./controllers/delete-classes"));

// update a class
router.patch("/:id", require("./controllers/update-classes"));

module.exports = router;