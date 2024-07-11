const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const StudentModel = require("../features/student/models/student.model");
const CourseModel = require("../features/course/models/course.model");
const ClassroomModel = require("../features/classroom/models/classroom.model");
const TeacherModel = require("../features/teacher/models/teacher.model");
const AcademicYearModel = require("../features/academicYear/models/academicYear.model");
const EnrollmentModel = require("../features/enrollment/models/enrollment.model");
const GradeModel = require("../features/grade/models/grade.model");
const PaymentModel = require("../features/payment/models/payment.model");
const TimetableModel = require("../features/timetable/models/timetable.model");
const NotificationModel = require("../features-main/notification/models/notification.model");
const StoryModel = require("../features-main/story/models/story.model");

// Define environment variable
dotenv.config({ path: "../shared/config/config.env" });

const connectDB = require("../shared/config/db");
connectDB().then();

const students = JSON.parse(
  fs.readFileSync(`${__dirname}/../_data/schoolar/students.json`)
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/../_data/schoolar/courses.json`)
);
const classrooms = JSON.parse(
  fs.readFileSync(`${__dirname}/../_data/schoolar/classrooms.json`)
);
const teachers = JSON.parse(
  fs.readFileSync(`${__dirname}/../_data/schoolar/teachers.json`)
);
const academicYears = JSON.parse(
  fs.readFileSync(`${__dirname}/../_data/schoolar/academicYears.json`)
);
const enrollments = JSON.parse(
  fs.readFileSync(`${__dirname}/../_data/schoolar/enrollments.json`)
);
const grades = JSON.parse(
  fs.readFileSync(`${__dirname}/../_data/schoolar/grades.json`)
);
const payments = JSON.parse(
  fs.readFileSync(`${__dirname}/../_data/schoolar/payments.json`)
);
const timetables = JSON.parse(
  fs.readFileSync(`${__dirname}/../_data/schoolar/timetables.json`)
);
const notifications = JSON.parse(
  fs.readFileSync(`${__dirname}/../_data/main/notifications.json`)
);
const stories = JSON.parse(
  fs.readFileSync(`${__dirname}/../_data/main/stories.json`)
);

const importData = async () => {
  try {
    await StudentModel.create(students);
    await CourseModel.create(courses);
    await ClassroomModel.create(classrooms);
    await TeacherModel.create(teachers);
    await AcademicYearModel.create(academicYears);
    await EnrollmentModel.create(enrollments);
    await GradeModel.create(grades);
    await PaymentModel.create(payments);
    await TimetableModel.create(timetables);
    await NotificationModel.create(notifications);
    console.log("data has been imported".brightGreen);
  } catch (error) {
    console.log("error importing data : ".brightRed, error);
  }
};

const deleteData = async () => {
  try {
    await StudentModel.deleteMany();
    await CourseModel.deleteMany();
    await ClassroomModel.deleteMany();
    await TeacherModel.deleteMany();
    await AcademicYearModel.deleteMany();
    await EnrollmentModel.deleteMany();
    await GradeModel.deleteMany();
    await PaymentModel.deleteMany();
    await TimetableModel.deleteMany();
    await NotificationModel.deleteMany();
    await StoryModel.deleteMany();
    console.log("data has been deleted".brightGreen);
  } catch (error) {
    console.log("error deleting data : ".brightRed, error);
  }
};

module.exports = {
  importData,
  deleteData,
};
