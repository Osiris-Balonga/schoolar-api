const router = require("express").Router();

const notificationRouter = require("../../features-main/notification/routes/notification.router");
router.use("/notification",notificationRouter);

module.exports = router;
