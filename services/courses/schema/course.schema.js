const mongoose = require('mongoose');
const CourseStudentEnrollment = require('../../courseStudentEnrollment/schema/courseStudentEnrollment.schema');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    cover_url: { type: String, default: null },
    total_available_seats: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    credits: { type: Number, required: true },
    assigned_faculty: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    is_active: { type: Boolean, default: true },

    prerequisites: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "Course"
    },
}, { timestamps: true })

const Course = mongoose.model("Course", courseSchema);


courseSchema.pre("save", async(next)=>{
    const currentDate = new Date();
    const courseEndDate = new Date(this.end_date);

    if(courseEndDate < currentDate){
        this.is_active = false;

        // make all enrollments as inactive
        await CourseStudentEnrollment.updateMany({course_id: this._id}, {is_active: false});
    }

    next();
})

module.exports = Course;