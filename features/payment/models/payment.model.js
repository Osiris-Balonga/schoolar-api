const mongoose = require("mongoose");
const MainSchema = require("../../../shared/models/main.model");

const Schema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  academicYear_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "academicYear",
  },
  amount: { type: Number, default: 0 },
  month: { type: Date, default: Date.now },
});

Schema.add(MainSchema);
module.exports = mongoose.model("payment", Schema);
