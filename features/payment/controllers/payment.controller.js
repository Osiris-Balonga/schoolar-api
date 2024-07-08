const PaymentModel = require("../models/payment.model");
const PopulateSchoolar = require("../../../shared/utils/populates/populateSchoolar");
const ErrorResponse = require("../../../shared/utils/errorResponse");
const asyncHandler = require("../../../shared/middlewares/async");
const AllFunctions = require("../../../shared/utils/functions");

module.exports.getAll = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

module.exports.create = asyncHandler(async (req, res, next) => {
  const data = req.body;
  req.body.codeObject = new AllFunctions().makeObjectCode("payment");
  console.log("data", data);

  const payment = await PaymentModel.create(data);

  if (!payment) {
    return next(new ErrorResponse(`payment not created`, 500));
  }
  await new AllFunctions().saveStory(req.user, "Création", "paiement", payment, payment);
  res.status(200).json({ succes: true, data: payment });
});

module.exports.getOne = asyncHandler(async (req, res, next) => {
  const payment = await PaymentModel.findById(req.params.id).populate(
    new PopulateSchoolar().payments());

  if (!payment) {
    return next(
      new ErrorResponse(`payment not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: payment });
});

module.exports.delete = asyncHandler(async (req, res, next) => {
  const payment = await PaymentModel.findById(req.params.id);

  if (!payment) {
    return next(
      new ErrorResponse(`payment not found with id of ${req.params.id}`, 404)
    );
  }

  await PaymentModel.updateOne(
    { _id: req.params.id },
    { status: "Deleted" },
    { new: true, runValidators: true }
  );
  const deleted = await PaymentModel.findById(req.params.id);

  await new AllFunctions().saveStory(
    req.user,
    "suppression",
    "paiement",
    payment,
    deleted
  );
  res.status(200).json({ success: true, data: {} });
});

module.exports.bulk = asyncHandler(async (req, res, next) => {
  const payment = req.body.objects;
  const action = req.body.action;

  await new BulkAction().bulk(payment, PaymentModel, action, null, "payment");

  res.status(201).json({
    success: true,
    data: {},
  });
});

module.exports.update = asyncHandler(async (req, res, next) => {
  req.body.status;

  let payment = await PaymentModel.findById(req.params.id);

  if (!payment) {
    return next(
      new ErrorResponse(`payment not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.body?.codeObject || req.body.codeObject === "")
    req.body.codeObject = new AllFunctions().makeObjectCode("payment");

  const paymentNewData = await PaymentModel.updateOne(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  const updated = await PaymentModel.findById(req.params.id);
  await new AllFunctions().saveStory(
    req.user,
    "Mise à jour",
    "paiement",
    payment,
    updated
  );

  res.status(200).json({ success: true, data: updated });
});