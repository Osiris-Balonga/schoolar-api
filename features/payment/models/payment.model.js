const mongoose = require("mongoose");
const MainSchema = require("../../../shared/models/main.model");

const validMonths = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const Schema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  academicYear_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "academicYear",
    required: true,
  },
  month: {
    type: String,
    enum: validMonths,
    required: true,
  },
  amount_due: {
    type: Number,
    required: true,
  },
  amount_paid: {
    type: Number,
    default: 0,
  },
  payment_date: {
    type: Date,
    default: Date.now,
  },
  payment_status: {
    type: String,
    enum: ["Payé", "Avancé", "Impayé"],
    default: "Impayé",
  },
  remaining_balance: {
    type: Number,
    default: function () {
      return this.amount_due - this.amount_paid;
    },
  },
});

Schema.index({ student_id: 1, academicYear_id: 1, month: 1 }, { unique: true });

Schema.add(MainSchema);

Schema.pre("save", function (next) {
  if (this.amount_paid === this.amount_due) {
    this.payment_status = "Payé";
  } else if (this.amount_paid > 0 && this.amount_paid < this.amount_due) {
    this.payment_status = "Avancé";
  } else if (this.amount_paid === 0) {
    this.payment_status = "Impayé";
  }
  next();
});

module.exports = mongoose.model("payment", Schema);
