const express = require('express');
const router = express.Router();
const Foodlover = require("../models/foodlover");
const FoodProvider = require("../models/foodprovider");

router.get('/', (req, res, next)=> {
    debugger
    console.log(res.locals.user.email);
    res.render("profile", {user: res.locals.user})
})

module.exports = router;