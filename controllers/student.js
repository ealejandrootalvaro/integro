var Student = require('../models/student');
var utils = require('../global/utils');
exports.index = function (req, res) {
    Student.get(function (err, students) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
            return;
        }
        res.json({
            status: "success",
            data: students
        })
    })
}

exports.new = function (req, res) {
    var student = new Student();
    student.name = req.body.name;
    student.age = req.body.age;

    student.save(function (err) {
        if (err) {
            res.json(err);
            return;
        }
        res.json({
            message: 'New student created',
            data: student
        })
    })
}

exports.view = function (req, res) {
    Student.findById(req.params.id, function (err, student) {
        if (err) {
            res.send(err);
            return;
        }
        res.json({
            message: 'Student details',
            data: student
        })
    })
}

exports.delete = function(req, res) {

    Student.findById(req.params.id, function (err, student) {
        if (err) {
            res.send(err);
            return;
        }
        student.remove(function(err) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
                return;
            }
            res.json({
                status: "success",
                message: 'The student has been removed'
            })
        })
    })
}

exports.update = function (req, res) {
    Student.findById(req.params.id, function (err, student) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
            return;
        }
        student = utils.buildModifications(student, ['name','age'], ['name','age'], req.body);
        student.save(function(err, updatedStudent) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
                return
            }
            res.json({
                status: "success",
                data: updatedStudent
            })

        })
    });
}