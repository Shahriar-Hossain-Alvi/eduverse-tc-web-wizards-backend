const StudentGrade = require('../schema/studentGrade.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const { course_id } = req.params;
    const { allGradesIds } = req.body;


    if (
        !Array.isArray(allGradesIds) ||
        allGradesIds.length === 0 ||
        !allGradesIds.every(id => mongoose.Types.ObjectId.isValid(id))
      ) {
        return next(new ErrorResponse("Invalid or missing grade IDs", 400));
      }
      

    if (!course_id) {
        return next(new ErrorResponse("Course ID is required", 400));
    }


    try {
        // Attempt to find and delete the grade by ID
        const deletedGrade = await StudentGrade.deleteMany({_id: {$in: allGradesIds}});

        // If grade not found
        if (!deletedGrade) {
            return next(new ErrorResponse("Student grade not found.", 404));
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: `Student grades deleted successfully.`,
        });
    } catch (error) {
        // Handle unexpected errors
        next(error);
    }
};
