const mongoose = require("mongoose");
const CourseFacultyAssignment = require("../schema/courseFacultyAssignment.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");


// Delete a CourseFacultyAssignment by ID
module.exports = async (req, res, next) => {
  const { params: { id } } = req;

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse("Invalid CourseFacultyAssignment ID", 400));
  }

  try {
    // Find the CourseFacultyAssignment by ID and delete it
    const deletedCourse = await CourseFacultyAssignment.findByIdAndDelete(id);

    // If no CourseFacultyAssignment is found, return an error
    if (!deletedCourse) {
      return next(new ErrorResponse("No Course Faculty Assignment found with the given ID", 404));
    }

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