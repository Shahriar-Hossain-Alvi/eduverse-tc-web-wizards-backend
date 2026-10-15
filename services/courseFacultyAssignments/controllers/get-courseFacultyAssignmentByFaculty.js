const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const CourseFacultyAssignment = require("../schema/courseFacultyAssignment.schema");


// Get a courseFacultyAssignment by ID
module.exports = async (req, res, next) => {
    const { facultyId } = req.params;

    if (!facultyId) {
        return next(new ErrorResponse("Faculty(users id) is required", 400))
    }

    // check if the id is a valid mongodb id
    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
        return next(new ErrorResponse("Invalid Faculty(users id) ID", 400));
    }

    try {
        // check if the courseFacultyAssignment exists or not
        const isCourseFacultyAssignmentExists = await CourseFacultyAssignment.find({ users_id: facultyId }).select("-__v -updatedAt -createdAt").populate("users_id", "first_name last_name").populate("course_id", "-createdAt -description -updatedAt -__v -assigned_faculty");


        // if courseFacultyAssignment is not found
        if (!isCourseFacultyAssignmentExists) {
            return next(new ErrorResponse(`There are no courseFacultyAssignment found for this faculty: ${facultyId}`, 404))
        }

        // send response
        res.status(200).json({
            success: true,
            message: "courseFacultyAssignment fetched successfully",
            data: isCourseFacultyAssignmentExists
        });

    } catch (error) {
        //send error response
        next(error)
    }
}