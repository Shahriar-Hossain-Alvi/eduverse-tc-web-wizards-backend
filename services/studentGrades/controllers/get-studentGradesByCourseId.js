const StudentGrade = require('../schema/studentGrade.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    const {course_id} = req.params;

    try {
        // Fetch all student grades with populated details
        const grades = await StudentGrade.find({
            course_id
        }).populate() // Populate faculty details



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
