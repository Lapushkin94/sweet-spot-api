const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Log from get resp');
    res.json({myTestRes: 'first res'});
})

module.exports = router;