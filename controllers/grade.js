var Grade = require('../models/grade');

exports.index = function (req, res) {
    Grade.get(function (err, grades) {
        if (err) {
            res.json({
                status: "error",
                message: err
            })
        }
        res.json({
            status: 'success',
            message: '',
            data: grades
        })
    })
}

exports.new = function (req, res) {
    var grade = new Grade();
    grade.name = req.body.name;
    grade.value = req.body.value;
    grade.studentId = req.body.studentId;
    grade.courseId = req.body.courseId;

    grade.save(function(err) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
            return;
        }
        res.json({
            message: 'New grade created',
            data: grade
        })
    })
}

exports.view = function (req, res) {
    Grade.findById(req.params.id, function (err, grade) {
        if (err) {
            res.send(err);
            return;
        }
            
        res.json({
            message: 'Grade details',
            data: grade
        })
    });
}

exports.delete = function(req, res) {
    Grade.deleteOne({_id: req.params.id}, function(err) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
            return;
        }
        res.json({
            status: "success",
            message: 'The grade has been removed'
        })
    })
}

exports.update = function (req, res) {
    Grade.findById(req.params.id, function (err, grade) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
            return;
        }
        grade = utils.buildModifications(grade, ['name','value','studentId', 'courseId'], ['name','value', 'studentId', 'courseId'], req.body);
        grade.save(function(err, updatedGrade) {
            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
                return
            }
            res.json({
                status: "success",
                data: updatedGrade
            })

        })
    });
}