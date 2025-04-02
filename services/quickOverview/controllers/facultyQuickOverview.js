const mongoose = require("mongoose");
const Course = require("../../courses/schema/course.schema");
const CourseFacultyAssignment = require("../../courseFacultyAssignments/schema/courseFacultyAssignment.schema");
const Class = require("../../classes/schema/classes.schema")


module.exports = async (req, res, next) => {

    const { id } = req?.params; // faculty id

    try {
        // get total courses teaching
        const total_courses_teaching = await CourseFacultyAssignment.countDocuments({
            users_id: { $in: [new mongoose.Types.ObjectId(id)] }
        });


        // get total enrolled students for this faculty's assigned courses
        const enrolled_students_for_this_faculty = await CourseFacultyAssignment.aggregate([
            // match courses assigned to the faculty
            {
                $match: { users_id: new mongoose.Types.ObjectId(id) }
            },

            // lookup students 
            {
                $lookup: {
                    from: "coursestudentenrollments",
                    localField: "course_id",
                    foreignField: "course_id",
                    as: "enrolled_students"
                }
            },

            // Step 3: Unwind enrolled_students array to count individual students
            { $unwind: "$enrolled_students" },

            // Step 4: Count total students
            {
                $group: {
                    _id: null,
                    total_students: { $sum: 1 }
                }
            }
        ]);



        // get recently assigned course
        const get_Latest_Assigned_Course = await CourseFacultyAssignment.find({
            users_id: {
                $in: [new mongoose.Types.ObjectId(id)]
            }
        }).sort({ createdAt: -1 })  // Sort by newest first
            .limit(1).select("course_id");

        const get_Latest_Assigned_Course_Data = await Course.findById(get_Latest_Assigned_Course[0].course_id).select("title start_date -_id")

        const latest_Assigned_Course = {
            latest_Assigned_Course_Id: get_Latest_Assigned_Course[0]._id,

            latest_Assigned_Course_title:
                get_Latest_Assigned_Course_Data.title,

            latest_Assigned_Course_start_date:
                get_Latest_Assigned_Course_Data.start_date,
        }


        // get upcoming 2 schedules
        const now = new Date(); // get current time
        const upcoming_Class_Schedules = await Class.find({
            faculty_id: { $in: [new mongoose.Types.ObjectId(id)] },
            scheduled_time: { $gte: now }
        })
            .sort({ scheduled_time: 1 })
            .limit(2)
            .select("scheduled_time title _id")

        const quickOverview = {
            total_courses_teaching,
            total_enrolled_students_for_this_faculty: enrolled_students_for_this_faculty.length > 0 ? enrolled_students_for_this_faculty[0].total_students : 0,
            latest_Assigned_Course,
            upcoming_Class_Schedules
        }


        res.status(201).json({
            data: quickOverview,
            success: true,
            message: "Overview fetched successfully"
        })
    } catch (error) {
        next(error)
    }
}