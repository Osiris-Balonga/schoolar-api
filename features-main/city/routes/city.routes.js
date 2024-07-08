const router = require('express').Router();
const cityController = require('../controllers/city.controller');
const CityModel = require('../models/city.model');
const { protect, authorize } = require('../../../shared/middlewares/auth');
const advancedResults = require('../../../shared/middlewares/advancedResults');
const Populate = require("../../../shared/utils/populates/populate")
    /*router.use(protect);
    router.use(authorize('Admin','User'));*/

router
    .route('/')
    .get(advancedResults(CityModel, new Populate().city(), 'city'), cityController.getAll) // path , ref et nom de l'entité
    .post(cityController.create);

router
    .route('/country/:id')
    .get(cityController.getByCountry)

router
    .route('/:id')
    .get(cityController.getOne)
    .put(cityController.update)
    .delete(cityController.delete);


module.exports = router;
