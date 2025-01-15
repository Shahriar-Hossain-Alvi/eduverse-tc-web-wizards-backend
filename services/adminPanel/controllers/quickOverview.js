const mongoose = require("mongoose");
const User = require("../../users/schema/user.schema");
const Course = require("../../courses/schema/course.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async(req, res)=>{
    try{
        const totalStudents = await User.countDocuments({user_role: "student"});
        const totalFaculty = await User.countDocuments({user_role: "faculty"});
        const totalCourses = await Course.countDocuments();
        const activeCourses = await Course.countDocuments({is_active: true});

        const quickOverView = {
            totalCourses: totalCourses,
            totalFaculty: totalFaculty,
            totalStudents:totalStudents,
            activeCourses:activeCourses
        }


        res.status(201).json({
            data: quickOverView,
            success: true,
            message: "Overview fetched successfully"
        })
    }catch(error){
        next(error)
    }
}