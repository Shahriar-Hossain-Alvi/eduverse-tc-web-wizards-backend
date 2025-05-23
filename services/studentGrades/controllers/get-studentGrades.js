const StudentGrade = require('../schema/studentGrade.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    try {
        // Fetch all student grades with populated details
        const grades = await StudentGrade.find()
            .populate() // Populate faculty details

        // If no grades are found
        if (grades.length === 0) {
            return next(new ErrorResponse("No student grades found.", 404));
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: "Student grades fetched successfully.",
            data: grades,
        });
    } catch (error) {
        // Handle unexpected errors
        next(error);
    }
};
