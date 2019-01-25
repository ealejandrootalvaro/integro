var mongoose = require('mongoose');
var Grade = require('./grade');

var studentSchema = mongoose.Schema({

    name: {
        type: String, 
        required: true
    },
    age: {
        type: Number
    }
});

studentSchema.pre('remove', function(next) {
    Grade.remove({studentId: this._id}).exec();
    next();
})

var Contact = mongoose.model('Student', studentSchema);
module.exports = Contact;
module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}