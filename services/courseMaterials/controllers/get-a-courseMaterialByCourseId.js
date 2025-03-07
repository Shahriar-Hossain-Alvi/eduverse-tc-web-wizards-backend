const mongoose = require('mongoose');
const CourseMaterial = require('../schema/courseMaterial.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const Course = require("../../courses/schema/course.schema")

module.exports = async (req, res, next) => {
    const { course_id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(course_id)) {
        return next(new ErrorResponse("Invalid Course ID.", 400));
    }

    try {
        // check if course exists
        const isCourseExists = await Course.findById(course_id);

        if(!isCourseExists){
            return next(new ErrorResponse("Course not found.", 404));
        }


        // Fetch the specific course material by course_id ID
        const courseMaterial = await CourseMaterial.find({course_id: course_id}).select("-__v -createdAt -updatedAt").populate("created_by", "first_name last_name");

        // If no material is found
        if (!courseMaterial) {
            return next(new ErrorResponse("Course material not found.", 404));
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: "Course material fetched successfully.",
            data: courseMaterial,
        });
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
};