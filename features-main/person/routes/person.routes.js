const router = require('express').Router();
const personController = require('../controllers/person.controller');
const PersonModel = require('../models/person.model');
const { protect, authorize } = require('../../../shared/middlewares/auth');
const advancedResults = require('../../../shared/middlewares/advancedResults');
const Populate = require("../../../shared/utils/populates/populate")
/*
router.use(protect);
router.use(authorize('Admin','User'));
*/


router
    .route('/')
    .get(advancedResults(PersonModel, new Populate().person(), 'person'), personController.getAll)
    // path , ref et nom de l'entité
    .post(personController.create);


router
    .route('/:id')
    .get(personController.getOne)
    .put(personController.update)
    .delete(personController.delete);


module.exports = router;
