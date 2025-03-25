const mongoose = require("mongoose");
const ClassAttendance = require("../schema/classAttendance.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const logActivity = require("../../../utils/LogActivity/logActivity")


module.exports = async (req, res, next) => {
    const { id } = req.params;

    // Validate MongoDB ObjectId for class_id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid ClassAttendance ID.", 400));
    }

    try {
        // Find and delete the attendance record
        const deletedRecord = await ClassAttendance.findByIdAndDelete(id);

        // If no record found
        if (!deletedRecord) {
            return next(new ErrorResponse("Attendance record not found.", 404));
        }

        await logActivity(
            "Class Attendance Deleted",
            `Attendance record for ClassAttendance ID ${deletedRecord._id} and date: ${deletedRecord.attendance_date} deleted successfully.`
        )

        // Success response
        res.status(200).json({
            success: true,
            message: `Attendance record for ClassAttendance ID ${deletedRecord._id} and date: ${deletedRecord.attendance_date} deleted successfully.`,
        });
    } catch (error) {
        next(error);
    }
};
