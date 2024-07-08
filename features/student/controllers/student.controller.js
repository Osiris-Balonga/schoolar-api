const StudentModel = require("../models/student.model");
const ErrorResponse = require("../../../shared/utils/errorResponse");
const asyncHandler = require("../../../shared/middlewares/async");
const AllFunctions = require("../../../shared/utils/functions");

module.exports.getAll = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

module.exports.create = asyncHandler(async (req, res, next) => {
  const data = req.body;
  req.body.codeObject = new AllFunctions().makeObjectCode("student");
  console.log("data", data);

  const student = await StudentModel.create(data);

  if (!student) {
    return next(new ErrorResponse(`student not created`, 500));
  }
  await new AllFunctions().saveStory(req.user, "Création", "étudiant", student, student);
  res.status(200).json({ succes: true, data: student });
});

module.exports.getOne = asyncHandler(async (req, res, next) => {
  const student = await StudentModel.findById(req.params.id);

  if (!student) {
    return next(
      new ErrorResponse(`student not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: student });
});

module.exports.delete = asyncHandler(async (req, res, next) => {
  const student = await StudentModel.findById(req.params.id);

  if (!student) {
    return next(
      new ErrorResponse(`student not found with id of ${req.params.id}`, 404)
    );
  }

  await StudentModel.updateOne(
    { _id: req.params.id },
    { status: "Deleted" },
    { new: true, runValidators: true }
  );
  const deleted = await StudentModel.findById(req.params.id);

  await new AllFunctions().saveStory(
    req.user,
    "suppression",
    "étudiant",
    student,
    deleted
  );
  res.status(200).json({ success: true, data: {} });
});

module.exports.bulk = asyncHandler(async (req, res, next) => {
  const student = req.body.objects;
  const action = req.body.action;

  await new BulkAction().bulk(student, StudentModel, action, null, "student");

  res.status(201).json({
    success: true,
    data: {},
  });
});

module.exports.update = asyncHandler(async (req, res, next) => {
  req.body.status;

  let student = await StudentModel.findById(req.params.id);

  if (!student) {
    return next(
      new ErrorResponse(`student not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.body?.codeObject || req.body.codeObject === "")
    req.body.codeObject = new AllFunctions().makeObjectCode("student");

  const studentNewData = await StudentModel.updateOne(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  const updated = await StudentModel.findById(req.params.id);
  await new AllFunctions().saveStory(
    req.user,
    "Mise à jour",
    "étudiant",
    student,
    updated
  );

  res.status(200).json({ success: true, data: updated });
});