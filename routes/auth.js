const express = require('express');
const router  = express.Router();

router.get('/*', (req, res, next) => req.signedCookies.username ? next() : res.redirect('/login'));





router.get('/*', (req, res, next) => {

    if(req.signedCookies.usertype === "foodlover") {

        Foodlover.findOne({email:  req.signedCookies.email})
            .then((result)=> {
                req.session.user = result;
                debugger
                // res.locals.user = result;
                next()
            })
            .catch(console.error()
            )
    } else if (req.signedCookies.usertype === "foodprovider"){
        FoodProvider.findOne({email:  req.signedCookies.email})
            .then((result)=> {
                req.session.user = result;
                debugger
                // res.locals.user = result;
                next()
            })
            .catch(console.error()
            )          
    } else {
        res.redirect('/')
    }

});





module.exports = router;