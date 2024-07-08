const router = require("express").Router();
const gradeController = require("../controllers/grade.controller");
const GradeModel = require("../models/grade.model");
const advancedResults = require("../../../shared/middlewares/advancedResults");
const PopulateSchoolar = require("../../../shared/utils/populates/populateSchoolar");
router
  .route("/")
  .get(
    advancedResults(
      GradeModel,
      new PopulateSchoolar().grades(),
      "grades"
    ),
    gradeController.getAll
  )
  .post(gradeController.create);

router
  .route("/:id")
  .get(gradeController.getOne)
  .put(gradeController.update)
  .delete(gradeController.delete);

router.route("/bulk").post(gradeController.bulk);

module.exports = router;
