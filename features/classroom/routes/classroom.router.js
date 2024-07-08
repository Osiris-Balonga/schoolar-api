const router = require("express").Router();
const classroomController = require("../controllers/classroom.controller");
const ClassroomModel = require("../models/classroom.model");
const advancedResults = require("../../../shared/middlewares/advancedResults");

router
  .route("/")
  .get(advancedResults(ClassroomModel, [], "classrooms"), classroomController.getAll)
  .post(classroomController.create);

router
  .route("/:id")
  .get(classroomController.getOne)
  .put(classroomController.update)
  .delete(classroomController.delete);

router.route("/bulk").post(classroomController.bulk);

module.exports = router;
