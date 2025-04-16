const StudentGrade = require('../schema/studentGrade.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    const {id} = req.params;

    try {
        // Fetch all student grades with populated details
        const grades = await StudentGrade.find({
            course_id: id
        }).select("-__v -createdAt -updatedAt -is_active").populate({
            path: "faculty_id",
            select: "first_name last_name"
        }).populate({
            path: "student_id",
            select: "first_name last_name user_name"
        })



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
