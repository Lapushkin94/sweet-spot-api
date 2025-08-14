const express = require('express');
const router = express.Router();
const placesController = require('../controllers/places-controller');
const { check } = require('express-validator');

router.get('/placeList', placesController.getPlacesList);

router.get('/:placeId', placesController.getPlacebyId);

router.get('/userPlaces/:userId', placesController.getUserPlaces);

router.post(
    '/addPlace',
    [
        check('title')
            .not()
            .isEmpty(),
        check('description')
            .isLength({ min: 5 }),
        check('address')
            .not()
            .isEmpty()
    ],
    placesController.addPlace
);

router.patch(
    '/editPlace/:placeId',
    [
        check('title')
            .not()
            .isEmpty(),
        check('description')
            .isLength({ min: 5 }),
        check('address')
            .not()
            .isEmpty()
    ],
    placesController.editPlace
);

router.delete('/deletePlace/:placeId', placesController.deletePlace);

module.exports = router;