const router = require('express').Router();
const storyController = require('../controllers/story.controller');
const StoryModel = require('../models/story.model');
const { protect, authorize } = require('../../../shared/middlewares/auth');
const advancedResults = require('../../../shared/middlewares/advancedResults');
const Populate = require("../../../shared/utils/populates/populate");

/*
router.use(protect);
router.use(authorize('Admin', 'OperatorAdmin', 'Contact', 'Customer', 'User'));
*/

router
    .route('/')
    .get(advancedResults(StoryModel, new Populate().story(),'story'), storyController.getAll); // path  ref et nom de l'entité



router
    .route('/user/:id')
    .get(storyController.getForUser)

router
    .route('/:id')
    .get(storyController.getOne)
    .delete(storyController.delete);


router
    .route('/stat-day')
    .post(storyController.statDay);


module.exports = router;
