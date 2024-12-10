const User = require("../schema/user.schema");



module.exports = async (req, res, next) => {

    try {
        const all_faculty = await User.find({ user_role: "faculty" });
        const total_faculty = all_faculty.length;


        const all_student = await User.find({ user_role: "student" });
        const total_student = all_student.length;

        const all_admin = await User.find({ user_role: "admin" });
        const total_admin = all_admin.length;   
        

        const total_user_count = {total_faculty: total_faculty, total_student:total_student, total_admin:total_admin}

        res.status(201).json({
            success: true,
            message: `Data fetched successfully`,
            data: total_user_count
        });
    } catch (error) {
        // Send Error Response
        next(error);
    }
};
