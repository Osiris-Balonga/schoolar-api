const router = require('express').Router();
const adressController = require('../controllers/address.controller');
const AddressModel = require('../models/address.model');
const { protect, authorize } = require('../../../shared/middlewares/auth');
const advancedResults = require('../../../shared/middlewares/advancedResults');
const Populate = require("../../../shared/utils/populates/populate")
/*router.use(protect);
router.use(authorize('Admin','User'));*/

router
    .route('/')
    .get(advancedResults(AddressModel, new Populate().address(), 'address'), adressController.getAll) // path , ref et nom de l'entité
    .post(adressController.create);


router
    .route('/:id')
    .get(adressController.getOne)
    .put(adressController.update)
    .delete(adressController.delete);


module.exports = router;
