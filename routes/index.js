const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Food Eureka', user: res.locals.user  });
});

module.exports = router;