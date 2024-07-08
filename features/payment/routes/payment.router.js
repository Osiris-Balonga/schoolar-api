const router = require("express").Router();
const paymentController = require("../controllers/payment.controller");
const PaymentModel = require("../models/payment.model");
const advancedResults = require("../../../shared/middlewares/advancedResults");
const PopulateSchoolar = require("../../../shared/utils/populates/populateSchoolar");
router
  .route("/")
  .get(
    advancedResults(
      PaymentModel,
      new PopulateSchoolar().payments(),
      "payments"
    ),
    paymentController.getAll
  )
  .post(paymentController.create);

router
  .route("/:id")
  .get(paymentController.getOne)
  .put(paymentController.update)
  .delete(paymentController.delete);

router.route("/bulk").post(paymentController.bulk);

module.exports = router;
