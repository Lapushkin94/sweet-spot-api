const axios = require('axios');
const HttpError = require('../modules/http-error');

const API_KEY = 'AIzaSyDeUh6v6UNaGj6RUcEINFm_7xvxwXYN6us';

async function getLocationForAddress(address) {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
        )}&key=${API_KEY}`
    );

    const data = response.data;

    if (!data || data.status === 'ZERO_RESULTS') {
        throw new HttpError('location error', 422);
    };

    const coordinates = data.results[0].geometry.location;

    return coordinates;
};

module.exports = getLocationForAddress;