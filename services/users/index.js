const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/middleware/token-verification/auth.middleware")
const verifyRole = require("../../utils/middleware/role-verification/verifyRole.middleware");

// login a user ^^^ this route does not need verify token
router.post("/login", require("./controllers/login-a-user")); // used in login page


router.use(verifyToken); // will apply to the below routes


// Get all users
router.get("/", verifyRole("admin"), require("./controllers/get-users")); // used in admins Users route to show list



// get user data by user role
router.get("/me", require("./controllers/me")); // used to fetch user data after login




// Get all faculty
router.get("/allFaculty", require("./controllers/get-all-faculty"));



// Create a new user => used in create account page of admin
router.post("/", verifyRole("admin"), require("./controllers/create-user"));



// get user number XXX ==== (might not needed) ==== XXX
router.get("/totalUsersNumber", require("./controllers/get-total-user-number"));


// update user password after first login => used to update the password in the profile page
router.patch("/updatePassword/:id", verifyRole("student", "faculty", "admin"), require("./controllers/update-user-password"));




// Get a user by id => used in the admin panel to get individual user data
router.get("/:id", verifyRole("admin"), require("./controllers/get-a-user"));


// Update a user by id => used by all users to update their info
router.patch("/:id", require("./controllers/update-user"));


// Delete a user by id => used by admin to delete a user
router.delete("/:id", require("./controllers/delete-user"));


module.exports = router;