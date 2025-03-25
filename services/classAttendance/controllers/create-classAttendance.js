const mongoose = require("mongoose");
const ClassAttendance = require("../schema/classAttendance.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const logActivity = require("../../../utils/LogActivity/logActivity");

module.exports = async (req, res, next) => {
    const { class_id, attendance_date, created_by, attendance_record } = req.body;

    // Validate MongoDB ObjectId for class_id and created_by
    if (!mongoose.Types.ObjectId.isValid(class_id)) {
        return next(new ErrorResponse("Invalid Class ID.", 400));
    }
    if (!mongoose.Types.ObjectId.isValid(created_by)) {
        return next(new ErrorResponse("Invalid Created by (Faculty) ID.", 400));
    }

    // Ensure attendance_date is valid
    if (!attendance_date || isNaN(new Date(attendance_date).getTime())) {
        return next(new ErrorResponse("Invalid attendance date.", 400));
    }

    // Validate attendance_record array
    if (!Array.isArray(attendance_record) || attendance_record.length === 0) {
        return next(new ErrorResponse("Attendance record must be a non-empty array.", 400));
    }

    try {
        // Validate each attendance record
        for (const { student_id, is_present } of attendance_record) {
            if (!mongoose.Types.ObjectId.isValid(student_id)) {
                return next(new ErrorResponse(`Invalid Student ID: ${student_id}`, 400));
            }
            if (!["present", "absent", "early leave", "late"].includes(is_present)) {
                return next(new ErrorResponse(`Invalid status: ${is_present}`, 400));
            }
        }



        // Check if an attendance record for this class and date already exists
        const existingAttendance = await ClassAttendance.findOne({ class_id, attendance_date });

        if(existingAttendance)
            return next(new ErrorResponse(`Attendance Record for this class already exists`, 400));

        // Create a new attendance record
        const newAttendance = new ClassAttendance({
            class_id,
            created_by,
            attendance_date,
            attendance_record,
        });

        await newAttendance.save();

        await logActivity(
            `A new Class attendance uploaded`,
            `Attendance for classID: ${class_id} was uploaded by facultyID: ${created_by}`
        )

        res.status(201).json({
            success: true,
            message: `Attendance records created successfully..`,
        });
    } catch (error) {
        next(error);
    }
};
