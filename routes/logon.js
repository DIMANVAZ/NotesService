var express = require('express');
var router = express.Router();

/* GET logon page. */
router.get('/', function(req, res, next) {
    res.render('logon', { title: 'Страница входа' });
});

module.exports = router;
