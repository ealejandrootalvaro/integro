var mongoose = require('mongoose');
var Grade = require('./grade');
var courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

courseSchema.pre('remove', function(next) {
    Grade.remove({courseId: this._id}).exec();
    next();
});

var Course = mongoose.model('Course', courseSchema);
module.exports = Course;
module.exports.get = function (callback, limit) {
    Course.find(callback).limit(limit);
}