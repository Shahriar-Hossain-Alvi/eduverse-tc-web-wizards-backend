const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const CourseFacultyAssignment = require("../schema/courseFacultyAssignment.schema");


// Get a courseFacultyAssignment by ID
module.exports = async (req, res, next) => {
    const { params: { id } } = req;

    if (!id) {
        return next(new ErrorResponse("id is required", 400))
    }

    // check if the id is a valid mongodb id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid courseFacultyAssignment ID", 400));
    }

    try {
        // check if the courseFacultyAssignment exists or not
        const result = await CourseFacultyAssignment.findById(id).select("-__v")
        .populate("users_id", "first_name last_name email")
        .populate("course_id", "title description");

        
        // if courseFacultyAssignment is not found
        if (!result) {
            return next(new ErrorResponse(`There are no courseFacultyAssignment found with this ID: ${id}`, 404))
        }

        // send response
        res.status(200).json({
            success: true,
            message: "courseFacultyAssignment fetched successfully",
            data: result
        });

    } catch (error) {
        //send error response
        next(error)
    }
}