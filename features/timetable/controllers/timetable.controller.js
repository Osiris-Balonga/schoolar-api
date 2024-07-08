const TimetableModel = require("../models/timetable.model");
const PopulateSchoolar = require("../../../shared/utils/populates/populateSchoolar");
const ErrorResponse = require("../../../shared/utils/errorResponse");
const asyncHandler = require("../../../shared/middlewares/async");
const AllFunctions = require("../../../shared/utils/functions");

module.exports.getAll = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

module.exports.create = asyncHandler(async (req, res, next) => {
  const data = req.body;
  req.body.codeObject = new AllFunctions().makeObjectCode("timetable");
  console.log("data", data);

  const timetable = await TimetableModel.create(data);

  if (!timetable) {
    return next(new ErrorResponse(`timetable not created`, 500));
  }
  await new AllFunctions().saveStory(req.user, "Création", "emploi du temps", timetable, timetable);
  res.status(200).json({ succes: true, data: timetable });
});

module.exports.getOne = asyncHandler(async (req, res, next) => {
  const timetable = await TimetableModel.findById(req.params.id).populate(
    new PopulateSchoolar().timetables());

  if (!timetable) {
    return next(
      new ErrorResponse(`timetable not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: timetable });
});

module.exports.delete = asyncHandler(async (req, res, next) => {
  const timetable = await TimetableModel.findById(req.params.id);

  if (!timetable) {
    return next(
      new ErrorResponse(`timetable not found with id of ${req.params.id}`, 404)
    );
  }

  await TimetableModel.updateOne(
    { _id: req.params.id },
    { status: "Deleted" },
    { new: true, runValidators: true }
  );
  const deleted = await TimetableModel.findById(req.params.id);

  await new AllFunctions().saveStory(
    req.user,
    "suppression",
    "emploi du temps",
    timetable,
    deleted
  );
  res.status(200).json({ success: true, data: {} });
});

module.exports.bulk = asyncHandler(async (req, res, next) => {
  const timetable = req.body.objects;
  const action = req.body.action;

  await new BulkAction().bulk(timetable, TimetableModel, action, null, "timetable");

  res.status(201).json({
    success: true,
    data: {},
  });
});

module.exports.update = asyncHandler(async (req, res, next) => {
  req.body.status;

  let timetable = await TimetableModel.findById(req.params.id);

  if (!timetable) {
    return next(
      new ErrorResponse(`timetable not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.body?.codeObject || req.body.codeObject === "")
    req.body.codeObject = new AllFunctions().makeObjectCode("timetable");

  const timetableNewData = await TimetableModel.updateOne(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  const updated = await TimetableModel.findById(req.params.id);
  await new AllFunctions().saveStory(
    req.user,
    "Mise à jour",
    "emploi du temps",
    timetable,
    updated
  );

  res.status(200).json({ success: true, data: updated });
});