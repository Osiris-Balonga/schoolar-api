const router = require("express").Router();
const academicYearController = require("../controllers/academicYear.controller");
const AcademicYearModel = require("../models/academicYear.model");
const advancedResults = require("../../../shared/middlewares/advancedResults");

router
  .route("/")
  .get(advancedResults(AcademicYearModel, [], "academicYear"), academicYearController.getAll)
  .post(academicYearController.create);

router
  .route("/:id")
  .get(academicYearController.getOne)
  .put(academicYearController.update)
  .delete(academicYearController.delete);

router.route("/bulk").post(academicYearController.bulk);

module.exports = router;
