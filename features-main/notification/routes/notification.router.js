const router = require("express").Router();
const notificationController = require("../controllers/notification.controller");
const NotificationModel = require("../models/notification.model");
const advancedResults = require("../../../shared/middlewares/advancedResults");

router
  .route("/")
  .get(advancedResults(NotificationModel, [], "notifications"), notificationController.getAll)
  .post(notificationController.create);

router
  .route("/:id")
  .get(notificationController.getOne)
  .put(notificationController.update)
  .delete(notificationController.delete);

router.route("/bulk").post(notificationController.bulk);

module.exports = router;
