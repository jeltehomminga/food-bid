const express = require('express');
const router = express.Router();
const Recaptcha = require('express-recaptcha').Recaptcha;
const recaptcha = new Recaptcha('6LeVxJMUAAAAAI5LrJLvOMnQ3gwjC7R3sb6km13O', '6LeVxJMUAAAAAEsqhZlOlpROHyjZoyW17iUZpmM3');
const Foodlover = require("../models/foodlover");
const FoodProvider = require("../models/foodprovider");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get('/:usertype', recaptcha.middleware.render, (req, res) => {
    const userType = req.params.usertype;
    const userTypeObject = {
        value: "",
        foodProvider: false,
        foodLover: false
    };

    if (userType === "restaurant" || userType === "homechef" || userType === "foodprovider") {
        userTypeObject.value = "foodprovider"
        userTypeObject.foodProvider = true;
        userTypeObject.foodLover = false;
    } else {
        userTypeObject.value = "foodlover"
        userTypeObject.foodProvider = false;
        userTypeObject.foodLover = true;
    }

    req.signedCookies.email ? res.redirect('/auth/profile') : res.render('signup', { captcha: res.recaptcha, userType: userTypeObject });
}
);


router.post("/:usertype", recaptcha.middleware.verify, recaptcha.middleware.render, (req, res, next) => {
    const userType = req.params.usertype;
    const email = req.body.email;
    const password = req.body.password;

    // if (!req.recaptcha.error) {

        if (userType === "foodlover") {
            Foodlover.findOne({ "email": email })
                
                .then(result => {
                    debugger
                    //Todo: save errormessage in res.locals , use redirect instead of render
                    if (result) res.render("signup", { errorMessage: "The email already exists!" });

                    else {
                        const salt = bcrypt.genSaltSync(bcryptSalt);
                        const hashPass = bcrypt.hashSync(password, salt);
                        Foodlover.create({
                            email,
                            password: hashPass
                        })
                            .then(() => {
                                res.cookie('email', email, { signed: true });
                                res.cookie('usertype', 'foodlover', { signed: true });
                                res.redirect("/auth/profile")
                            })
                            .catch(error => console.log(error))
                    }
                })

        } else {

            FoodProvider.findOne({ "email": email })

                .then(result => {

                    if (result) res.render("signup", { errorMessage: "The email already exists!" });
                    else {
     
                        const salt = bcrypt.genSaltSync(bcryptSalt);
                        const hashPass = bcrypt.hashSync(password, salt);
                        FoodProvider.create({
                            email,
                            password: hashPass
                        })
                            .then(() => {
                                res.cookie('email', email, { signed: true });
                                res.cookie('usertype', 'foodprovider', { signed: true });
                                res.redirect("/auth/profile")
                            })
                            .catch(error => console.log(error))
                    }
                })

        }
    // } else {

    //     res.redirect("/signup/" + userType);
    // }

});

module.exports = router;