const StudentGrade = require('../schema/studentGrade.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const { params: { id },
        body: { grade, is_active }
    } = req;

    // Check if ID is provided
    if (!id) {
        return next(new ErrorResponse("Student grade ID is required", 400));
    }

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid ID!", 400));
    }

    // Check if required fields are provided
    if (grade === undefined) {
        return next(new ErrorResponse("Grade is required", 400));
    }

    try {
        // Find the grade by ID
        const gradeToUpdate = await StudentGrade.findById(id);

        // If grade not found
        if (!gradeToUpdate) {
            return next(new ErrorResponse("Student grade not found.", 404));
        }

        // Update fields
        if (grade !== undefined) gradeToUpdate.grade = grade;
        if (is_active !== undefined) gradeToUpdate.is_active = is_active;

        // Save the updated grade
        const updatedGrade = await gradeToUpdate.save();

        // Send success response
        res.status(200).json({
            success: true,
            message: `Student grade for ID: ${updatedGrade._id} updated successfully.`,
        });
    } catch (error) {
        // Handle unexpected errors
        next(error);
    }
};
