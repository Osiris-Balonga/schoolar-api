const EnrollmentModel = require("../models/enrollment.model");
const PopulateSchoolar = require("../../../shared/utils/populates/populateSchoolar");
const ErrorResponse = require("../../../shared/utils/errorResponse");
const asyncHandler = require("../../../shared/middlewares/async");
const AllFunctions = require("../../../shared/utils/functions");

module.exports.getAll = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

module.exports.create = asyncHandler(async (req, res, next) => {
  const data = req.body;
  req.body.codeObject = new AllFunctions().makeObjectCode("enrollment");
  console.log("data", data);

  const enrollment = await EnrollmentModel.create(data);

  if (!enrollment) {
    return next(new ErrorResponse(`enrollment not created`, 500));
  }
  await new AllFunctions().saveStory(req.user, "Création", "inscription", enrollment, enrollment);
  res.status(200).json({ succes: true, data: enrollment });
});

module.exports.getOne = asyncHandler(async (req, res, next) => {
  const enrollment = await EnrollmentModel.findById(req.params.id).populate(
    new PopulateSchoolar().enrollments());

  if (!enrollment) {
    return next(
      new ErrorResponse(`enrollment not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: enrollment });
});

module.exports.delete = asyncHandler(async (req, res, next) => {
  const enrollment = await EnrollmentModel.findById(req.params.id);

  if (!enrollment) {
    return next(
      new ErrorResponse(`enrollment not found with id of ${req.params.id}`, 404)
    );
  }

  await EnrollmentModel.updateOne(
    { _id: req.params.id },
    { status: "Deleted" },
    { new: true, runValidators: true }
  );
  const deleted = await EnrollmentModel.findById(req.params.id);

  await new AllFunctions().saveStory(
    req.user,
    "suppression",
    "inscription",
    enrollment,
    deleted
  );
  res.status(200).json({ success: true, data: {} });
});

module.exports.bulk = asyncHandler(async (req, res, next) => {
  const enrollment = req.body.objects;
  const action = req.body.action;

  await new BulkAction().bulk(enrollment, EnrollmentModel, action, null, "enrollment");

  res.status(201).json({
    success: true,
    data: {},
  });
});

module.exports.update = asyncHandler(async (req, res, next) => {
  req.body.status;

  let enrollment = await EnrollmentModel.findById(req.params.id);

  if (!enrollment) {
    return next(
      new ErrorResponse(`enrollment not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.body?.codeObject || req.body.codeObject === "")
    req.body.codeObject = new AllFunctions().makeObjectCode("enrollment");

  const enrollmentNewData = await EnrollmentModel.updateOne(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  const updated = await EnrollmentModel.findById(req.params.id);
  await new AllFunctions().saveStory(
    req.user,
    "Mise à jour",
    "inscription",
    enrollment,
    updated
  );

  res.status(200).json({ success: true, data: updated });
});