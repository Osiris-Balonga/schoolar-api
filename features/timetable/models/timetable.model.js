const mongoose = require("mongoose");
const MainSchema = require("../../../shared/models/main.model");

const Schema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ],
    default: false,
  },
  startTime: { type: String, default: false },
  EndTime: { type: String, default: false },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  academicYear_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "academicYear",
  },
  classroom_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classroom",
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
  },
});

Schema.add(MainSchema);
module.exports = mongoose.model("timetable", Schema);
