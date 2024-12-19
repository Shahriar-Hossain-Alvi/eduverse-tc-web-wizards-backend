const mongoose = require("mongoose");
const ClassAttendance = require("../schema/classAttendance.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    const { id } = req.params;
    const { attendance_date, attendance_record } = req.body;

    // Validate MongoDB ObjectId for classAttendance ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid ClassAttendance ID.", 400));
    }

    try {
        // Validate attendance_date if provided
        if (attendance_date) {
            const date = new Date(attendance_date);
            if (isNaN(date.getTime())) {
                return next(new ErrorResponse("Invalid attendance date.", 400));
            }
        }

        // Validate attendance_record if provided
        if (attendance_record && !Array.isArray(attendance_record)) {
            return next(new ErrorResponse("Attendance record must be an array.", 400));
        }

        // Update the class attendance record
        const updatedAttendance = await ClassAttendance.findOneAndUpdate(
            { _id: id },
            {
                ...(attendance_date && { attendance_date }),
                ...(attendance_record && { attendance_record }),
            },
            { new: true, runValidators: true }
        )
            .populate("class_id", "title")
            .populate("created_by", "first_name last_name email")
            .populate("attendance_record.student_id", "first_name last_name email")
            .select("-__v -updatedAt");

        // If no record is found
        if (!updatedAttendance) {
            return next(new ErrorResponse("Class attendance record not found.", 404));
        }

        // Success response
        res.status(200).json({
            success: true,
            message: `Class attendance record for ${updatedAttendance._id} updated successfully.`,
        });
    } catch (error) {
        next(error);
    }
};
 