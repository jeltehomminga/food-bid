const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=> {
    res.clearCookie("email");
    res.clearCookie("usertype");
    res.locals.user = undefined;
    res.locals.foodLover = undefined;
    res.locals.foodProvider = undefined;
    res.redirect('/');
})

module.exports = router;