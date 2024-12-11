const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const Course = require("../schema/course.schema");


// get all courses
module.exports = async (req, res, next) => {
    const {
        params: { id },
    } = req;

    if (!id) {
        return next(new ErrorResponse("id is required", 400))
    }

    // check if the id is a valid mongodb id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid course ID", 400));
    }

    try {
        // check if the course exists or not
        const result = await Course.findById(id).select("-__v");

        // if course is not found
        if (!result) {
            return next(new ErrorResponse(`There are no course found with this ID: ${id}`, 404))
        }

        // send response
        res.status(200).json({
            success: true,
            message: "Course fetched successfully",
            data: result
        });

    } catch (error) {
        //send error response
        next(error)
    }
}