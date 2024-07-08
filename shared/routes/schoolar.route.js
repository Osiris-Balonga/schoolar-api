const router = require("express").Router();

const studentRouter = require("../../features/student/routes/student.router");
router.use("/student", studentRouter);

const courseRouter = require("../../features/course/routes/course.router");
router.use("/course", courseRouter);

const classroomRouter = require("../../features/classroom/routes/classroom.router");
router.use("/classroom", classroomRouter);

const teacherRouter = require("../../features/teacher/routes/teacher.router");
router.use("/teacher", teacherRouter);

const academicYearRouter = require("../../features/academicYear/routes/academicYear.router");
router.use("/academicYear", academicYearRouter);

const enrollmentRouter = require("../../features/enrollment/routes/enrollment.router");
router.use("/enrollment", enrollmentRouter);

const gradeRouter = require("../../features/grade/routes/grade.router");
router.use("/grade", gradeRouter);

const paymentRouter = require("../../features/payment/routes/payment.router");
router.use("/payment", paymentRouter);

const timetableRouter = require("../../features/timetable/routes/timetable.router");
router.use("/timetable", timetableRouter);

module.exports = router;
