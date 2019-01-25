var mongoose = require('mongoose');

var Student = require('./student');
var Course = require('./course');

var Schema = mongoose.Schema;
var gradeSchema = Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
})

gradeSchema.pre('save', function (next, req) {
    Student.findOne({_id: this.studentId}, function(err, found) {
        if (found) {
            return next();
        } else {
            return next(new Error('Student not found'));
        }
    })
});

gradeSchema.pre('save', function (next, req) {
    Course.findOne({_id: this.studentId}, function(err, found) {
        if (found) {
            return next();
        } else {
            return next(new Error('Course not found'));
        }
    })
});

var Grade = mongoose.model('Grade', gradeSchema);
module.exports = Grade;
module.exports.get = function (callback, limit) {
    Grade.find(callback).limit(limit);
}