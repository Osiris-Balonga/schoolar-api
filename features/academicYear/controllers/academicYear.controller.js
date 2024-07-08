const AcademicYearModel = require("../models/academicYear.model");
const ErrorResponse = require("../../../shared/utils/errorResponse");
const asyncHandler = require("../../../shared/middlewares/async");
const AllFunctions = require("../../../shared/utils/functions");

module.exports.getAll = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

module.exports.create = asyncHandler(async (req, res, next) => {
  const data = req.body;
  req.body.codeObject = new AllFunctions().makeObjectCode("academicYear");
  console.log("data", data);

  const academicYear = await AcademicYearModel.create(data);

  if (!academicYear) {
    return next(new ErrorResponse(`academicYear not created`, 500));
  }
  await new AllFunctions().saveStory(req.user, "Création", "année académique", academicYear, academicYear);
  res.status(200).json({ succes: true, data: academicYear });
});

module.exports.getOne = asyncHandler(async (req, res, next) => {
  const academicYear = await AcademicYearModel.findById(req.params.id);

  if (!academicYear) {
    return next(
      new ErrorResponse(`academicYear not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: academicYear });
});

module.exports.delete = asyncHandler(async (req, res, next) => {
  const academicYear = await AcademicYearModel.findById(req.params.id);

  if (!academicYear) {
    return next(
      new ErrorResponse(`academicYear not found with id of ${req.params.id}`, 404)
    );
  }

  await AcademicYearModel.updateOne(
    { _id: req.params.id },
    { status: "Deleted" },
    { new: true, runValidators: true }
  );
  const deleted = await AcademicYearModel.findById(req.params.id);

  await new AllFunctions().saveStory(
    req.user,
    "suppression",
    "année académique",
    academicYear,
    deleted
  );
  res.status(200).json({ success: true, data: {} });
});

module.exports.bulk = asyncHandler(async (req, res, next) => {
  const academicYear = req.body.objects;
  const action = req.body.action;

  await new BulkAction().bulk(academicYear, AcademicYearModel, action, null, "academicYear");

  res.status(201).json({
    success: true,
    data: {},
  });
});

module.exports.update = asyncHandler(async (req, res, next) => {
  req.body.status;

  let academicYear = await AcademicYearModel.findById(req.params.id);

  if (!academicYear) {
    return next(
      new ErrorResponse(`academicYear not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.body?.codeObject || req.body.codeObject === "")
    req.body.codeObject = new AllFunctions().makeObjectCode("academicYear");

  const academicYearNewData = await AcademicYearModel.updateOne(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  const updated = await AcademicYearModel.findById(req.params.id);
  await new AllFunctions().saveStory(
    req.user,
    "Mise à jour",
    "année académique",
    academicYear,
    updated
  );

  res.status(200).json({ success: true, data: updated });
});