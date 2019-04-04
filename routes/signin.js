const express = require('express');
const router = express.Router();
const Recaptcha = require('express-recaptcha').Recaptcha;
const recaptcha = new Recaptcha(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY);
const Foodlover = require("../models/foodlover");
const FoodProvider = require('../models/foodprovider');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get('/', recaptcha.middleware.render, (req, res) => res.render('signin', { captcha: res.recaptcha }));

router.post("/", recaptcha.middleware.verify, (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email === "" || password === "") res.render("signin", { errorMessage: "Please enter both, username and password to sign up." });
    if (!req.recaptcha.error) {

        if (req.body.inlineRadioOptions === "foodlover") {
            Foodlover.findOne({ "email": email })
                .then(foodLover => {
                    if (!foodLover) {
                        res.render("signin", { errorMessage: "The username doesn't exist." });
                    } else if (bcrypt.compareSync(password, foodLover.password)) {
                        req.currentUser = foodLover;
                        res.locals.foodlover = true;
                        res.cookie('email', email, { signed: true });
                        res.cookie('usertype', 'foodlover', { signed: true });
                        res.redirect("/auth/requestdish")
                    } else res.render("signin", { errorMessage: "Incorrect password" });
                })
                .catch(error => next(error))
        } else if (req.body.inlineRadioOptions === "foodprovider") {
            FoodProvider.findOne({ "email": email })
                .then(foodProvider => {
                    if (!foodProvider) res.render("signin", { errorMessage: "The username doesn't exist." });
                    else if (bcrypt.compareSync(password, foodProvider.password)) {
                        req.currentUser = foodProvider;
                        res.locals.foodProvider = true
                        res.cookie('email', email, { signed: true });
                        res.cookie('usertype', 'foodprovider', { signed: true });
                        res.redirect("/auth/allrequests")
                    } else res.render("signin", { errorMessage: "Incorrect password" })
                })
                .catch(error => next(error));
        }

    } else {
        res.render("signin", { errorMessage: "Captcha incorrect, are you a robot!?" });
    }


});

module.exports = router;