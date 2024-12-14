const mongoose = require("mongoose");
const Course = require("../schema/course.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");



// Delete a course by ID
module.exports = async (req, res, next) => {
  const { params: { id } } = req;

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse("Invalid course ID", 400));
  }

  try {
    // Find the course by ID and delete it
    const deletedCourse = await Course.findByIdAndDelete(id);

    // If no course is found, return an error
    if (!deletedCourse) {
      return next(new ErrorResponse("No course found with the given ID", 404));
    }

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    // Handle errors
    next(error);
  }
};