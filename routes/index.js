var express = require('express');
var router = express.Router();

const {readAll} = require("../db/dbConnector.js");
const {writeNote} = require("../db/dbConnector");
let notesArray = [];

router.post('/', function(req, res){

    notesArray.push(req.body.noteText);
    writeNote(req.body.noteText).then(r => console.log(r));
    console.log(notesArray);
    res.render('index', {notesArray})
})

/* GET home page. */
router.get('/', async function (req, res, next) {
    res.render('index', {title: 'Сервис записей',notesArray});
});

module.exports = router;
