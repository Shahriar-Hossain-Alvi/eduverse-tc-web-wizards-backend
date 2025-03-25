const mongoose = require("mongoose");
const ClassAttendance = require("../schema/classAttendance.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    const { class_id } = req.params;
    const { attendance_date } = req.body;

    // Validate MongoDB ObjectId for class_id
    if (!mongoose.Types.ObjectId.isValid(class_id)) {
        return next(new ErrorResponse("Invalid Class ID.", 400));
    }

    try {
        // Build the query
        const query = { class_id };

        // Add date filter if provided
        if (attendance_date) {
            const date = new Date(attendance_date);
            if (isNaN(date.getTime())) {
                return next(new ErrorResponse("Invalid attendance date.", 400));
            }
            query.attendance_date = date;
        }

        // Fetch attendance records
        const attendanceRecords = await ClassAttendance.find(query)
            .populate("created_by", "first_name last_name email")
            .populate("attendance_record")
            .select("-__v -updatedAt");

        // If no records are found, return an empty array with success = true
        if (!attendanceRecords || attendanceRecords.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No attendance records found for the specified class.",
                data: [],
            });
        }

        // Success response
        res.status(200).json({
            success: true,
            data: attendanceRecords,
        });
    } catch (error) {
        next(error);
    }
};
