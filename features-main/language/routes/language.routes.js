const router = require('express').Router();
const languageController = require('../controllers/language.controller');
const LanguageModel = require('./../models/language.model');
const { protect, authorize } = require('../../../shared/middlewares/auth');
const advancedResults = require('../../../shared/middlewares/advancedResults');
const Populate = require("../../../shared/utils/populates/populate")
// router.use(protect);
// router.use(authorize('Admin','User'));

router
    .route('/')
    .get(advancedResults(LanguageModel, [], 'language'), languageController.getAll)
    .post(languageController.create);

router.route("/bulk").post(languageController.bulk);

router
    .route('/:id')
    .get(languageController.getOne)
    .put(languageController.update)
    .delete(languageController.delete);

module.exports = router;
