const StudentGrade = require('../schema/studentGrade.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const { id } = req.params; // Get the student ID 

    if (!id) {
        return next(
            new ErrorResponse("student id is required", 400)
        );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid ID!", 400));
    }

    try {
        // Fetch the student grade by ID with populated course and user details
        const grade = await StudentGrade.find({
            student_id: id
        })
        .populate("course_id", "title credits start_date end_date -_id")
        .populate("faculty_id", "first_name last_name -_id")
        .populate("student_id", "first_name last_name -_id")
        .select("-__v -updatedAt -createdAt -is_active")


        // Send success response
        res.status(200).json({
            success: true,
            message: "Student grade fetched successfully.",
            data: grade,
        });
    } catch (error) {
        // Handle unexpected errors
        next(error);
    }
};
