const mongoose = require("mongoose");
const CourseFacultyAssignment = require("../schema/courseFacultyAssignment.schema");
const Class = require("../../classes/schema/classes.schema");
const CourseMaterial = require("../../courseMaterials/schema/courseMaterial.schema");
const CourseStudentEnrollment = require("../../courseStudentEnrollment/schema/courseStudentEnrollment.schema");
const ClassAttendance = require("../../classAttendance/schema/classAttendance.schema");
const ClassMaterial = require("../../classMaterials/schema/classMaterials.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");


// Delete a CourseFacultyAssignment by ID
module.exports = async (req, res, next) => {
  const { params: { id } } = req;
  console.log(id);

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse("Invalid CourseFacultyAssignment ID", 400));
  }

  try {
    // Find the CourseFacultyAssignment by ID and delete it
    const deleteAssignedCourse = await CourseFacultyAssignment.findByIdAndDelete(id);

    console.log(deleteAssignedCourse);

    // If no CourseFacultyAssignment is found, return an error
    if (!deleteAssignedCourse) {
      return next(new ErrorResponse("No Course Faculty Assignment found with the given ID", 404));
    }

    // get the course id from deleteAssignedCourse
    const courseId = deleteAssignedCourse.course_id;

    // Find all class IDs related to the course
    const classes = await Class.find({ course_id: courseId }).select("_id");
    const classIds = classes.map(cls => cls._id); // Extract class_id values



    await Promise.all([
      Class.deleteMany({ course_id: courseId }),
      CourseMaterial.deleteMany({ course_id: courseId }),
      CourseStudentEnrollment.deleteMany({ course_id: courseId }),

      classIds.length > 0 ?
        ClassMaterial.deleteMany({ class_id: { $in: classIds } })
        : Promise.resolve(),

      classIds.length > 0 ? ClassAttendance.deleteMany({ class_id: { $in: classIds } }) : Promise.resolve()
    ])

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Course Faculty Assignment deleted successfully along with the Class Schedules, Class Materials, Course Materials, Class Attendance, Student Enrollment for this course",
    });
  } catch (error) {
    // Handle errors
    next(error);
  }
};