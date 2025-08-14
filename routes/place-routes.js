const express = require('express');
const HttpError = require('../modules/http-error');
const router = express.Router();

const USERS = [
    { id: 1, name: "Vladi toxic", image: 'avatar1', placesNumber: 1 },
    { id: 2, name: "Fedo weirdo", image: 'avatar2', placesNumber: 2 },
    { id: 3, name: "Olly overthinker", image: 'avatar3', placesNumber: 3 },
    { id: 4, name: "Dmitrii vouno", image: 'avatar4', placesNumber: 4 },
    { id: 5, name: "Kitten", image: 'avatar5', placesNumber: 5 },
    { id: 6, name: "Anasteisha", image: 'avatar6', placesNumber: 57 },
];

const PLACES = [
    {
        id: "1",
        image: 'placeTest1',
        title: "collective1",
        address: "some street1",
        description: "some desc1",
        creatorId: "1",
        coordinates: {
            lat: 40.5493713,
            lng: 23.0190911,
        },
    },
    {
        id: "2",
        image: 'placeTest1',
        title: "marrrr",
        address: "marrrr street",
        description: "marrrr description",
        creatorId: "2",
        coordinates: {
            lat: 40.64015790456649,
            lng: 22.948205906138483,
        },
    },
    {
        id: "3",
        image: 'placeTest2',
        title: "Asya asya",
        address: "asetrina street",
        description: "asya description",
        creatorId: "1",
        coordinates: {
            lat: 40.6345441,
            lng: 22.9522438,
        },
    },
];

router.get('/allPlaces', (req, res, next) => {
    res.json({message: 'I am all places', allPlaces: PLACES});
});

router.get('/:placeId', (req, res, next) => {
    const chosenPlace = PLACES.find(place => place.id === req.params.placeId);

    if (!chosenPlace) {
        return next(new HttpError('no places found', 404));
    }

    res.json({ message: 'I am a place', requestedPlaceId: req.params.placeId, foundPlace: chosenPlace });
});

router.get('/:userId/places', (req, res, next) => {
    const chosenUser = USERS.find(user => user.id === req.params.userId);

    if (!chosenUser) {
        return next(new HttpError('no places found for the user', 404));
    }

    res.json({
        message: 'I am a user',
        requestedUserId: req.params.userId,
        foundUser: chosenUser,
        userPlaces: PLACES.filter(place => place.creatorId === req.params.userId)
    });
});

module.exports = router;