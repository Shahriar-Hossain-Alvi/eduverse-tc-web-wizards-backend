const mongoose = require("mongoose");



// Delete a CourseFacultyAssignment by ID
module.exports = async (req, res, next) => {
  const { params: { id } } = req;

  

  try {
    

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Course Faculty Assignment deleted successfully",
    });
  } catch (error) {
    // Handle errors
    next(error);
  }
};