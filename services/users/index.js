const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")



// Get all users
router.get("/", verifyToken, require("./views/get-users"));


// Get all faculty
router.get("/allFaculty", verifyToken, require("./views/get-all-faculty"));


// Create a new user
router.post("/", verifyToken, require("./views/create-user"));


// login a user
router.post("/login", require("./views/login-a-user"));


// get user number
router.get("/totalUsersNumber", verifyToken, require("./views/get-total-user-number"));


// Get a user by id
router.get("/:id", verifyToken, require("./views/get-a-user"));


// Update a user by id
router.patch("/:id", verifyToken, require("./views/update-user"));


// Delete a user by id
router.delete("/:id", verifyToken, require("./views/delete-user"));


module.exports = router;