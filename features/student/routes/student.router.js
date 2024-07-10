const router = require("express").Router();
const studentController = require("../controllers/student.controller");
const StudentModel = require("../models/student.model");
const advancedResults = require("../../../shared/middlewares/advancedResults");
const PopulateSchoolar = require("../../../shared/utils/populates/populateSchoolar");

router
  .route("/")
  .get(
    advancedResults(
      StudentModel,
      new PopulateSchoolar().students(),
      "students"
    ),
    studentController.getAll
  )
  .post(studentController.create);

router
  .route("/:id")
  .get(studentController.getOne)
  .put(studentController.update)
  .delete(studentController.delete);

router.route("/bulk").post(studentController.bulk);

module.exports = router;
