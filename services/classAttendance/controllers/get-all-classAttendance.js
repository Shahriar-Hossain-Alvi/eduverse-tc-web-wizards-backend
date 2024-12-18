const mongoose = require("mongoose");
const ClassAttendance = require("../schema/classAttendance.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    try {
        // Fetch all attendance records
        const attendanceRecords = await ClassAttendance.find({})
            .populate("class_id", "title")
            .populate("created_by", "first_name last_name email")
            .populate("attendance_record.student_id", "first_name last_name email")
            .select("-__v -updatedAt");

        // Check if records exist
        if (!attendanceRecords || attendanceRecords.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No attendance records found.",
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
