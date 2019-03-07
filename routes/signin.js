var express = require('express');
var router = express.Router();
var Recaptcha = require('express-recaptcha').Recaptcha;
var recaptcha = new Recaptcha('6LeVxJMUAAAAAI5LrJLvOMnQ3gwjC7R3sb6km13O', '6LeVxJMUAAAAAEsqhZlOlpROHyjZoyW17iUZpmM3');
const Foodlover = require("../models/foodlover");
const FoodProvider = require('../models/foodprovider');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get('/', recaptcha.middleware.render, (req, res) => res.render('signin', { captcha: res.recaptcha }));

router.post("/", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    debugger
    if (email === "" || password === "") {
        return res.render("signin", { errorMessage: "Please enter both, username and password to sign up." });
    }
    debugger
    if(req.body.inlineRadioOptions === "foodlover"){
        Foodlover.findOne({ "email": email })
        .then(foodLover => {
            if (!foodLover) {
                res.render("signin", { errorMessage: "The username doesn't exist." });
            } else if (bcrypt.compareSync(password, foodLover.password)) {
                req.currentUser = foodLover;
                res.locals.foodlover = true
                res.cookie('email', email, { signed: true });
                res.cookie('usertype', 'foodlover', { signed: true });
                res.redirect("/auth/requestdish")
            } else {
                res.render("signin", { errorMessage: "Incorrect password" });
            }
        })
        .catch(error => {
            next(error);
        })
    }  else if (req.body.inlineRadioOptions === "foodprovider"){
        FoodProvider.findOne({ "email": email })
        .then(foodProvider => {
            debugger
            if (!foodProvider) {
                res.render("signin", { errorMessage: "The username doesn't exist." });
            } else if (bcrypt.compareSync(password, foodProvider.password)) {
                req.currentUser = foodProvider;
                res.locals.foodProvider = true
                res.cookie('email', email, { signed: true });
                res.cookie('usertype', 'foodprovider', { signed: true });
                res.redirect("/auth/allrequests")
            } else {
                res.render("signin", { errorMessage: "Incorrect password" });
            }
        })
        .catch(error => {
            next(error);
        })
    }

});

module.exports = router;