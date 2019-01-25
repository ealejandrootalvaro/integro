let router = require('express').Router();
var studentController = require('../controllers/student');
var courseController = require('../controllers/course');
var gradeController = require('../controllers/grade');

router.get('/', function (req, res) {
    res.json({
        status: 'API Its working',
        message: 'Welcome'
    })
})

router.route('/students')
    .get(studentController.index)
    .post(studentController.new)

router.route('/students/:id')
    .get(studentController.view)
    .put(studentController.update)
    .delete(studentController.delete);

router.route('/courses')
    .get(courseController.index)
    .post(courseController.new);

router.route('/courses/:id')
    .get(courseController.view)
    .put(courseController.update)
    .delete(courseController.delete);

router.route('/courses/:id/grades/average')
    .get(courseController.averageGrade);

router.route('/grades')
    .get(gradeController.index)
    .post(gradeController.new);

router.route('/grades/:id')
    .get(gradeController.view)
    .put(gradeController.update)
    .delete(gradeController.delete);

module.exports = router;