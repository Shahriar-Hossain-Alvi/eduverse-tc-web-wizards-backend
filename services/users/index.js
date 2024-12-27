const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")
const verifyRole = require("../../utils/middleware/role-verification/verifyRole.middleware");

// login a user ^^^ this route does not need verify token
router.post("/login", require("./controllers/login-a-user"));


router.use(verifyToken);


// Get all users
router.get("/", verifyRole("admin"), require("./controllers/get-users"));


// get user data by user role
router.get("/me", require("./controllers/me"));


// Get all faculty
router.get("/allFaculty", require("./controllers/get-all-faculty"));


// Create a new user
router.post("/", require("./controllers/create-user"));


// get user number
router.get("/totalUsersNumber", require("./controllers/get-total-user-number"));


// update user password after first login
router.patch("/updatePassword/:id", require("./controllers/update-user-password"));


// Get a user by id
router.get("/:id", require("./controllers/get-a-user"));


// Update a user by id
router.patch("/:id", require("./controllers/update-user"));


// Delete a user by id
router.delete("/:id", require("./controllers/delete-user"));


module.exports = router;