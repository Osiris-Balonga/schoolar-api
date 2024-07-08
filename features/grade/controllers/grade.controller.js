const GradeModel = require("../models/grade.model");
const PopulateSchoolar = require("../../../shared/utils/populates/populateSchoolar");
const ErrorResponse = require("../../../shared/utils/errorResponse");
const asyncHandler = require("../../../shared/middlewares/async");
const AllFunctions = require("../../../shared/utils/functions");

module.exports.getAll = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

module.exports.create = asyncHandler(async (req, res, next) => {
  const data = req.body;
  req.body.codeObject = new AllFunctions().makeObjectCode("grade");
  console.log("data", data);

  const grade = await GradeModel.create(data);

  if (!grade) {
    return next(new ErrorResponse(`grade not created`, 500));
  }
  await new AllFunctions().saveStory(req.user, "Création", "note", grade, grade);
  res.status(200).json({ succes: true, data: grade });
});

module.exports.getOne = asyncHandler(async (req, res, next) => {
  const grade = await GradeModel.findById(req.params.id).populate(
    new PopulateSchoolar().grades());

  if (!grade) {
    return next(
      new ErrorResponse(`grade not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: grade });
});

module.exports.delete = asyncHandler(async (req, res, next) => {
  const grade = await GradeModel.findById(req.params.id);

  if (!grade) {
    return next(
      new ErrorResponse(`grade not found with id of ${req.params.id}`, 404)
    );
  }

  await GradeModel.updateOne(
    { _id: req.params.id },
    { status: "Deleted" },
    { new: true, runValidators: true }
  );
  const deleted = await GradeModel.findById(req.params.id);

  await new AllFunctions().saveStory(
    req.user,
    "suppression",
    "note",
    grade,
    deleted
  );
  res.status(200).json({ success: true, data: {} });
});

module.exports.bulk = asyncHandler(async (req, res, next) => {
  const grade = req.body.objects;
  const action = req.body.action;

  await new BulkAction().bulk(grade, GradeModel, action, null, "grade");

  res.status(201).json({
    success: true,
    data: {},
  });
});

module.exports.update = asyncHandler(async (req, res, next) => {
  req.body.status;

  let grade = await GradeModel.findById(req.params.id);

  if (!grade) {
    return next(
      new ErrorResponse(`grade not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.body?.codeObject || req.body.codeObject === "")
    req.body.codeObject = new AllFunctions().makeObjectCode("grade");

  const gradeNewData = await GradeModel.updateOne(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  const updated = await GradeModel.findById(req.params.id);
  await new AllFunctions().saveStory(
    req.user,
    "Mise à jour",
    "note",
    grade,
    updated
  );

  res.status(200).json({ success: true, data: updated });
});