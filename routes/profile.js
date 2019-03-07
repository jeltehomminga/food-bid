const express = require('express');
const router = express.Router();
const Foodlover = require("../models/foodlover");
const FoodProvider = require("../models/foodprovider");

router.get('/', (req, res, next) => res.render("profile", { user: res.locals.user}));

router.post('/:id', (req, res) => {
    if (res.locals.user.foodLover) {
        Foodlover.findByIdAndUpdate(req.params.id, res.req.body, (err) => {
            if (err) console.log("Something wrong when updating data!")
            else res.redirect('/auth/requestdish');
        });
    } else if (res.locals.user.foodProvider) {
        FoodProvider.findByIdAndUpdate(req.params.id, res.req.body, (err) => {
            if (err) console.log("Something wrong when updating data!");
            else res.redirect('/auth/allrequests');
        });
    } else res.send('You are not a foodlover, but also not a foodprovider? get outta here!')
})

module.exports = router;