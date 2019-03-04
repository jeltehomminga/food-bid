var express = require('express');
var router = express.Router();
var Recaptcha = require('express-recaptcha').Recaptcha;
var recaptcha = new Recaptcha('6LeVxJMUAAAAAI5LrJLvOMnQ3gwjC7R3sb6km13O', '6LeVxJMUAAAAAEsqhZlOlpROHyjZoyW17iUZpmM3');
const Foodlover = require("../models/foodlover");
const FoodProvider = require("../models/foodprovider");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get('/:usertype', recaptcha.middleware.render, (req, res) => {
    
    const userType = req.params.usertype;
    let foodProvider = "";
    if (userType === "restaurant") {
        foodProvider = true;
    }
    req.signedCookies.username ? res.redirect('profile') : res.render('signup', { captcha: res.recaptcha, foodProvider });
}
);

router.post("/", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    Foodlover.findOne({ "email": email })
        .then(result => {
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
                        res.redirect("/requestdish")
                    })
                    .catch(error => console.log(error))
            }
        })
});

module.exports = router;