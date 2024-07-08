const router = require("express").Router();
const timetableController = require("../controllers/timetable.controller");
const TimetableModel = require("../models/timetable.model");
const advancedResults = require("../../../shared/middlewares/advancedResults");
const PopulateSchoolar = require("../../../shared/utils/populates/populateSchoolar");
router
  .route("/")
  .get(
    advancedResults(
      TimetableModel,
      new PopulateSchoolar().timetables(),
      "timetables"
    ),
    timetableController.getAll
  )
  .post(timetableController.create);

router
  .route("/:id")
  .get(timetableController.getOne)
  .put(timetableController.update)
  .delete(timetableController.delete);

router.route("/bulk").post(timetableController.bulk);

module.exports = router;
