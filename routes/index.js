var express = require('express');
var router = express.Router();
const sequelize = require("../db/dbConnector.js");

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    res.render('index', {title: 'Сервис записей'});
});

module.exports = router;
