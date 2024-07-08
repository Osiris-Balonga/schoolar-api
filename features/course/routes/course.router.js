const router = require("express").Router();
const courseController = require("../controllers/course.controller");
const CourseModel = require("../models/course.model");
const advancedResults = require("../../../shared/middlewares/advancedResults");

router
  .route("/")
  .get(advancedResults(CourseModel, [], "courses"), courseController.getAll)
  .post(courseController.create);

router
  .route("/:id")
  .get(courseController.getOne)
  .put(courseController.update)
  .delete(courseController.delete);

router.route("/bulk").post(courseController.bulk);

module.exports = router;
