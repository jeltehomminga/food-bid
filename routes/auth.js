const express = require('express');
const router = express.Router();
const FoodProvider = require('../models/foodprovider');
const Foodlover = require('../models/foodlover');

router.get('/*', (req, res, next) => {
    if (req.signedCookies.usertype === "foodlover") {
        Foodlover.findOne({ email: req.signedCookies.email })
            .then(result => {
                res.locals.user = result;
                next()
            })
            .catch(console.error())
    } else if (req.signedCookies.usertype === "foodprovider") {
        FoodProvider.findOne({ email: req.signedCookies.email })
            .then(result => {
                res.locals.user = result;
                next()
            })
            .catch(console.error())
    } else {
        res.redirect('/')
    }
});

module.exports = router;