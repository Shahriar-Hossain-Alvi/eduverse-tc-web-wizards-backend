const ErrorResponse = require("../../../utils/middleware/error/error.response");
const CourseFacultyAssignment = require("../schema/courseFacultyAssignment.schema");

// get all courseFacultyAssignment
module.exports = async (req, res, next) => {
    try {
        //fetch all assignments
        const result = await CourseFacultyAssignment.find().select("-__v -updatedAt -createdAt")
        .populate("users_id", "first_name last_name")
        .populate("course_id", "title credits start_date end_date is_active cover_url total_available_seats"); 



        // send response
        res.status(200).json({
            success: true,
            message: "Course Faculty Assignments fetched successfully",
            data: result
        });

    } catch (error) {
        //send error response
        next(error)
    }
}