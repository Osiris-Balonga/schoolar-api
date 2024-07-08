const router = require("express").Router();
const teacherController = require("../controllers/teacher.controller");
const TeacherModel = require("../models/teacher.model");
const advancedResults = require("../../../shared/middlewares/advancedResults");
const PopulateSchoolar = require("../../../shared/utils/populates/populateSchoolar");
router
  .route("/")
  .get(
    advancedResults(
      TeacherModel,
      new PopulateSchoolar().teachers(),
      "teachers"
    ),
    teacherController.getAll
  )
  .post(teacherController.create);

router
  .route("/:id")
  .get(teacherController.getOne)
  .put(teacherController.update)
  .delete(teacherController.delete);

router.route("/bulk").post(teacherController.bulk);

module.exports = router;
