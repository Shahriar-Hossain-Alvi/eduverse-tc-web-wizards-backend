const StudentGrade = require('../schema/studentGrade.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const { params: { id },
        body: { obtained_marks, remarks, is_active }
    } = req;

    console.log(id);
    console.log(req.body);

    // Check if ID is provided
    if (!id) {
        return next(new ErrorResponse("Student grade ID is required", 400));
    }

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid ID!", 400));
    }


    try {

        // Find the grade by ID
        const gradeToUpdate = await StudentGrade.findById(id);

        // If grade not found
        if (!gradeToUpdate) {
            return next(new ErrorResponse("Student grade not found.", 404));
        }

        const updateDoc = {};

        if (obtained_marks !== undefined) {
            const parsed = parseFloat(obtained_marks);
            if (!isNaN(parsed)) {
              updateDoc.obtained_marks = parsed;
            } else {
              return next(new ErrorResponse("Obtained marks must be a valid number", 400));
            }
          }

        if (remarks !== undefined) updateDoc.remarks = remarks;
        if (is_active !== undefined) updateDoc.is_active = is_active;

        // Save the updated grade
        const updatedGrade = await StudentGrade.findByIdAndUpdate(id, updateDoc, { new: true });

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
