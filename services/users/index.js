const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")



// Get all users
router.get("/", require("./controllers/get-users"));


// Get all faculty
router.get("/allFaculty", require("./controllers/get-all-faculty"));


// Create a new user
router.post("/", require("./controllers/create-user"));


// login a user
router.post("/login", require("./controllers/login-a-user"));


// get user number
router.get("/totalUsersNumber", require("./controllers/get-total-user-number"));


// Get a user by id
router.get("/:id", require("./controllers/get-a-user"));


// Update a user by id
router.patch("/:id", require("./controllers/update-user"));


// Delete a user by id
router.delete("/:id", require("./controllers/delete-user"));


module.exports = router;