const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");



// Delete a course by ID
module.exports = async (req, res, next) => {
  const { params: { id } } = req;

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse("Invalid course ID", 400));
  }

 
};