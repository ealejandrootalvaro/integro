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

var Grade = mongoose.model('Grade', gradeSchema);
module.exports = Grade;
module.exports.get = function (callback, limit) {
    Grade.find(callback).limit(limit);
}