const express = require('express');
const router = express.Router();
const Foodlover = require("../models/foodlover");
const FoodProvider = require("../models/foodprovider");

router.get('/', (req, res, next) => {
    let foodLover = ""; 
    req.signedCookies.usertype === "foodlover" ? foodLover = true : foodLover = false;
    res.render("profile", { user: res.locals.user, foodLover})
})

router.post('/:id', (req, res, next) => {

    if (req.signedCookies.usertype === "foodlover") {

        Foodlover.findByIdAndUpdate(req.params.id, res.req.body, (err) => {
            if (err) console.log("Something wrong when updating data!")
            else res.redirect('/auth/requestdish');
        });

    } else if (req.signedCookies.usertype === "foodprovider") {

        FoodProvider.findByIdAndUpdate(req.params.id, res.req.body, (err) => {
            if (err)
                console.log("Something wrong when updating data!");
            else res.redirect('/auth/allrequests');
        });

    } else {
        res.render('You are not a foodlover, but also not a foodprovider? get outta here!')
    }

})

module.exports = router;