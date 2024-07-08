const ClassroomModel = require("../models/classroom.model");
const ErrorResponse = require("../../../shared/utils/errorResponse");
const asyncHandler = require("../../../shared/middlewares/async");
const AllFunctions = require("../../../shared/utils/functions");

module.exports.getAll = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

module.exports.create = asyncHandler(async (req, res, next) => {
  const data = req.body;
  req.body.codeObject = new AllFunctions().makeObjectCode("classroom");
  console.log("data", data);

  const classroom = await ClassroomModel.create(data);

  if (!classroom) {
    return next(new ErrorResponse(`classroom not created`, 500));
  }
  await new AllFunctions().saveStory(req.user, "Création", "classe", classroom, classroom);
  res.status(200).json({ succes: true, data: classroom });
});

module.exports.getOne = asyncHandler(async (req, res, next) => {
  const classroom = await ClassroomModel.findById(req.params.id);

  if (!classroom) {
    return next(
      new ErrorResponse(`classroom not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: classroom });
});

module.exports.delete = asyncHandler(async (req, res, next) => {
  const classroom = await ClassroomModel.findById(req.params.id);

  if (!classroom) {
    return next(
      new ErrorResponse(`classroom not found with id of ${req.params.id}`, 404)
    );
  }

  await ClassroomModel.updateOne(
    { _id: req.params.id },
    { status: "Deleted" },
    { new: true, runValidators: true }
  );
  const deleted = await ClassroomModel.findById(req.params.id);

  await new AllFunctions().saveStory(
    req.user,
    "suppression",
    "classe",
    classroom,
    deleted
  );
  res.status(200).json({ success: true, data: {} });
});

module.exports.bulk = asyncHandler(async (req, res, next) => {
  const classroom = req.body.objects;
  const action = req.body.action;

  await new BulkAction().bulk(classroom, ClassroomModel, action, null, "classroom");

  res.status(201).json({
    success: true,
    data: {},
  });
});

module.exports.update = asyncHandler(async (req, res, next) => {
  req.body.status;

  let classroom = await ClassroomModel.findById(req.params.id);

  if (!classroom) {
    return next(
      new ErrorResponse(`classroom not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.body?.codeObject || req.body.codeObject === "")
    req.body.codeObject = new AllFunctions().makeObjectCode("classroom");

  const classroomNewData = await ClassroomModel.updateOne(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  const updated = await ClassroomModel.findById(req.params.id);
  await new AllFunctions().saveStory(
    req.user,
    "Mise à jour",
    "classe",
    classroom,
    updated
  );

  res.status(200).json({ success: true, data: updated });
});