const router = require('express').Router();
const userTypeController = require('../controllers/user-type.controller');
const UserTypeModel = require('../models/user-type.model');
const { protect, authorize } = require('../../../shared/middlewares/auth');
const advancedResults = require('../../../shared/middlewares/advancedResults');
const Populate = require("../../../shared/utils/populates/populate")
/*router.use(protect);
router.use(authorize('Admin', 'User'));*/

router
    .route('/')
    .get(advancedResults(UserTypeModel, new Populate().userType(), 'userType'), userTypeController.getAll) // path , ref et nom de l'entité
    .post(userTypeController.create);


router
    .route('/:id')
    .get(userTypeController.getOne)
    .put(userTypeController.update)
    .delete(userTypeController.delete);


module.exports = router;
