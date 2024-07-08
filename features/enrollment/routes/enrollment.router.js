const router = require("express").Router();
const enrollmentController = require("../controllers/enrollment.controller");
const EnrollmentModel = require("../models/enrollment.model");
const advancedResults = require("../../../shared/middlewares/advancedResults");
const PopulateSchoolar = require("../../../shared/utils/populates/populateSchoolar");
router
  .route("/")
  .get(
    advancedResults(
      EnrollmentModel,
      new PopulateSchoolar().enrollments(),
      "enrollments"
    ),
    enrollmentController.getAll
  )
  .post(enrollmentController.create);

router
  .route("/:id")
  .get(enrollmentController.getOne)
  .put(enrollmentController.update)
  .delete(enrollmentController.delete);

router.route("/bulk").post(enrollmentController.bulk);

module.exports = router;
