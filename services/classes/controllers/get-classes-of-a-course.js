const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const Class = require("../schema/classes.schema");
const Course = require("../../courses/schema/course.schema");


// get all classes for an assigned course
module.exports = async (req, res, next) => {
    const { course_id } = req.params;
    console.log(course_id);

    if (!course_id) {
        return next(new ErrorResponse("course_id is required", 400));
    }

    // check if the course_id is a valid mongodb id
    if (!mongoose.Types.ObjectId.isValid(course_id)) {
        return next(new ErrorResponse("Invalid course_id ID", 400));
    }

    try {
        // check if the course exists or not
        const course = await Course.findById(course_id);

        // if course is not found
        if (!course) {
            return next(new ErrorResponse(`There are no course found with this ID: ${course_id}`, 404))
        }

        const result = await Class.find({course_id})

        // send response
        res.status(200).json({
            success: true,
            message: "Class fetched successfully",
            data: result
        });

    } catch (error) {
        //send error response
        next(error)
    }
}