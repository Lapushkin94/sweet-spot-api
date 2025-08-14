const HttpError = require('../modules/http-error');
const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const getLocationForAddress = require('../utils/locations');

const USERS = [
    { id: 1, name: "Vladi toxic", image: 'avatar1', placesNumber: 1 },
    { id: 2, name: "Fedo weirdo", image: 'avatar2', placesNumber: 2 },
    { id: 3, name: "Olly overthinker", image: 'avatar3', placesNumber: 3 },
    { id: 4, name: "Dmitrii vouno", image: 'avatar4', placesNumber: 4 },
    { id: 5, name: "Kitten", image: 'avatar5', placesNumber: 5 },
    { id: 6, name: "Anasteisha", image: 'avatar6', placesNumber: 57 },
];

let PLACES = [
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

const getPlacesList = (req, res, next) => {
    res.json({ message: 'I am all places', allPlaces: PLACES });
};

const getPlacebyId = (req, res, next) => {
    const chosenPlace = PLACES.find(place => place.id === req.params.placeId);

    if (!chosenPlace) {
        return next(new HttpError('no place found', 404));
    }

    res.json({ message: 'I am a place', requestedPlaceId: req.params.placeId, foundPlace: chosenPlace });
};

const getUserPlaces = (req, res, next) => {
    const userPlaces = PLACES.filter(place => place.creatorId === req.params.userId);

    if (!userPlaces) {
        return next(new HttpError('No user places found', 404));
    }

    res.json({
        message: 'I am a user',
        requestedUserId: req.params.userId,
        userPlaces: userPlaces
    });
};

const addPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input', 422));
    };

    const { title, address, description, creatorId } = req.body;

    let coordinates;
    try {
        coordinates = await getLocationForAddress(address);
    } catch (error) {
        return next(error);
    };

    const createdPlace = {
        id: uuid(),
        title,
        address,
        description,
        creatorId,
        coordinates
    };

    PLACES.push(createdPlace);

    res.status(201).json({ place: createdPlace });
};

const editPlace = (req, res, next) => {
    const { title, address, description, coordinates } = req.body;
    const editedPlace = { ...PLACES.find(place => place.id === req.params.placeId) };

    if (!editedPlace) {
        return next(new HttpError('no place to edit', 404));
    };

    const placeIndex = PLACES.findIndex(place => place.id === req.params.placeId);

    editedPlace.title = title;
    editedPlace.address = address;
    editedPlace.description = description;
    editedPlace.coordinates = coordinates;

    PLACES[placeIndex] = editedPlace;

    res.status(200).json({
        message: 'Place edited',
        place: editedPlace
    });
};

const deletePlace = (req, res, next) => {
    const placeId = req.params.placeId;
    const placeToDelete = PLACES.find(place => place.id === placeId);

    if (!placeToDelete) {
        return next(new HttpError('no place to delete', 404));
    };

    PLACES = PLACES.filter(place => place.id !== placeId);
    res.status(200).json('place deleted, id: ' + placeId);
};

exports.getUserPlaces = getUserPlaces;
exports.getPlacesList = getPlacesList;
exports.getPlacebyId = getPlacebyId;
exports.addPlace = addPlace;
exports.editPlace = editPlace;
exports.deletePlace = deletePlace;