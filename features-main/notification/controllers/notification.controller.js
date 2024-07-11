const NotificationModel = require("../models/notification.model");
const ErrorResponse = require("../../../shared/utils/errorResponse");
const asyncHandler = require("../../../shared/middlewares/async");
const AllFunctions = require("../../../shared/utils/functions");

module.exports.getAll = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

module.exports.create = asyncHandler(async (req, res, next) => {
  const data = req.body;
  req.body.codeObject = new AllFunctions().makeObjectCode("notification");
  console.log("data", data);

  const notification = await NotificationModel.create(data);

  if (!notification) {
    return next(new ErrorResponse(`notification not created`, 500));
  }
  await new AllFunctions().saveStory(req.user, "Création", "notification", notification, notification);
  res.status(200).json({ succes: true, data: notification });
});

module.exports.getOne = asyncHandler(async (req, res, next) => {
  const notification = await NotificationModel.findById(req.params.id);

  if (!notification) {
    return next(
      new ErrorResponse(`notification not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: notification });
});

module.exports.delete = asyncHandler(async (req, res, next) => {
  const notification = await NotificationModel.findById(req.params.id);

  if (!notification) {
    return next(
      new ErrorResponse(`notification not found with id of ${req.params.id}`, 404)
    );
  }

  await NotificationModel.updateOne(
    { _id: req.params.id },
    { status: "Deleted" },
    { new: true, runValidators: true }
  );
  const deleted = await NotificationModel.findById(req.params.id);

  await new AllFunctions().saveStory(
    req.user,
    "suppression",
    "notification",
    notification,
    deleted
  );
  res.status(200).json({ success: true, data: {} });
});

module.exports.bulk = asyncHandler(async (req, res, next) => {
  const notification = req.body.objects;
  const action = req.body.action;

  await new BulkAction().bulk(notification, NotificationModel, action, null, "notification");

  res.status(201).json({
    success: true,
    data: {},
  });
});

module.exports.update = asyncHandler(async (req, res, next) => {
  req.body.status;

  let notification = await NotificationModel.findById(req.params.id);

  if (!notification) {
    return next(
      new ErrorResponse(`notification not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.body?.codeObject || req.body.codeObject === "")
    req.body.codeObject = new AllFunctions().makeObjectCode("notification");

  const notificationNewData = await NotificationModel.updateOne(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  const updated = await NotificationModel.findById(req.params.id);
  await new AllFunctions().saveStory(
    req.user,
    "Mise à jour",
    "notification",
    notification,
    updated
  );

  res.status(200).json({ success: true, data: updated });
});