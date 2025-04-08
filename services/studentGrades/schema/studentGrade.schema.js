const mongoose = require("mongoose");

const studentGradesSchema = new mongoose.Schema(
    {
        course_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        student_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        faculty_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        obtained_marks: {
            type: Number,
            required: true,
            validate: {
                validator: function (v) {
                    return v <= this.full_marks
                },
                message: props => `Obtained marks (${props.value}) cannot exceed full marks (${props.instance.full_marks})`
            }
        },
        full_marks: {
            type: Number,
            required: true
        },
        remarks: {
            type: String,
            default: ""
        },
        is_active: { type: Boolean, default: true },
    },
    { timestamps: true }
);


// calculate percentage
studentGradesSchema.virtual("percentage").get(function (){
    return this.full_marks > 0 ?
    (this.obtained_marks / this.full_marks) * 100 : 0;
});

// include virtual field when converting to JSON or Object
studentGradesSchema.set("toObject", { virtuals: true });
studentGradesSchema.set("toJSON", { virtuals: true });

const StudentGrade = mongoose.model("StudentGrade", studentGradesSchema);

module.exports = StudentGrade;