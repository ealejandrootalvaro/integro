var Course = require('../models/course');
var Grade = require('../models/grade');
var utils = require('../global/utils');

exports.index = function (req, res) {
    Course.get(function (err, courses) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
            return;
        }
        res.json({
            status: "success",
            data: courses
        })
    })
}

exports.new = function (req, res) {
    var course = new Course();
    course.name = req.body.name

    course.save(function (err) {
        if (err) {
            res.json(err);
            return;
        }
        res.json({
            message: 'New course created',
            data: course
        })
    })
}

exports.view = function (req, res) {
    Course.findById(req.params.id, function (err, course) {
        if (err) {
            res.send(err);
            return;
        }

        res.json({
            message: 'Course details',
            data: course
        })
    });
}

exports.averageGrade = function (req, res) {

    Grade.find({ courseId: req.params.id }, function (err, grades) {
        if (err) {
            res.json({
                status: "error",
                message: err
            })
            return;
        }
        if (grades.length == 0) {
            res.json({
                status: "error",
                message: "The course doesnt have grades"
            })
            return;
        }
        var sum = 0;

        for (let index = 0; index < grades.length; index++) {
            const grade = grades[index];
            sum += grade.value;
        }

        let average = null;

        res.json({
            status: "success",
            data: sum / grades.length
        });
    });
}

exports.delete = function(req, res) {
    Course.deleteOne({_id: req.params.id}, function(err) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
            return;
        }
        res.json({
            status: "success",
            message: 'The course has been deleted'
        })
    })
}

exports.update = function (req, res) {
    Course.findById(req.params.id, function (err, course) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
            return;
        }
        course = utils.buildModifications(course, ['name'], ['name'], req.body);
        course.save(function(err, updatedCourse) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
                return
            }
            res.json({
                status: "success",
                data: updatedCourse
            })

        })
    });
}
