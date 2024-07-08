const TeacherModel = require("../models/teacher.model");
const PopulateSchoolar = require("../../../shared/utils/populates/populateSchoolar");
const ErrorResponse = require("../../../shared/utils/errorResponse");
const asyncHandler = require("../../../shared/middlewares/async");
const AllFunctions = require("../../../shared/utils/functions");

module.exports.getAll = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

module.exports.create = asyncHandler(async (req, res, next) => {
  const data = req.body;
  req.body.codeObject = new AllFunctions().makeObjectCode("teacher");
  console.log("data", data);

  const teacher = await TeacherModel.create(data);

  if (!teacher) {
    return next(new ErrorResponse(`teacher not created`, 500));
  }
  await new AllFunctions().saveStory(req.user, "Création", "enseignant(e)", teacher, teacher);
  res.status(200).json({ succes: true, data: teacher });
});

module.exports.getOne = asyncHandler(async (req, res, next) => {
  const teacher = await TeacherModel.findById(req.params.id).populate(
    new PopulateSchoolar().teachers());

  if (!teacher) {
    return next(
      new ErrorResponse(`teacher not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: teacher });
});

module.exports.delete = asyncHandler(async (req, res, next) => {
  const teacher = await TeacherModel.findById(req.params.id);

  if (!teacher) {
    return next(
      new ErrorResponse(`teacher not found with id of ${req.params.id}`, 404)
    );
  }

  await TeacherModel.updateOne(
    { _id: req.params.id },
    { status: "Deleted" },
    { new: true, runValidators: true }
  );
  const deleted = await TeacherModel.findById(req.params.id);

  await new AllFunctions().saveStory(
    req.user,
    "suppression",
    "enseignant(e)",
    teacher,
    deleted
  );
  res.status(200).json({ success: true, data: {} });
});

module.exports.bulk = asyncHandler(async (req, res, next) => {
  const teacher = req.body.objects;
  const action = req.body.action;

  await new BulkAction().bulk(teacher, TeacherModel, action, null, "teacher");

  res.status(201).json({
    success: true,
    data: {},
  });
});

module.exports.update = asyncHandler(async (req, res, next) => {
  req.body.status;

  let teacher = await TeacherModel.findById(req.params.id);

  if (!teacher) {
    return next(
      new ErrorResponse(`teacher not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.body?.codeObject || req.body.codeObject === "")
    req.body.codeObject = new AllFunctions().makeObjectCode("teacher");

  const teacherNewData = await TeacherModel.updateOne(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  const updated = await TeacherModel.findById(req.params.id);
  await new AllFunctions().saveStory(
    req.user,
    "Mise à jour",
    "enseignant(e)",
    teacher,
    updated
  );

  res.status(200).json({ success: true, data: updated });
});